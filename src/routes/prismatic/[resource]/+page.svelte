<script lang="ts">
	import Icon from "@iconify/svelte"
	import { onMount } from "svelte"
	import type { resource, componentORresource, prismaticResult } from "$lib/types/all"
	import {
		getResource,
		updateResource,
		getComponentsForPrismatic,
		updatePrismaticComponents,
		calculatePrismaticProfit
	} from "$lib/functions"
	import { page } from "$app/stores"
	import { toast } from "@zerodevx/svelte-toast"

	let resource: resource | undefined
	let components: componentORresource[] = []
	let buttonState: "crafting" | "prices" = "crafting"
	let result: prismaticResult | undefined
	let checked: boolean = false

	onMount(() => {
		getData()
	})

	function getData() {
		resource = getResource($page.params.resource)
		components = getComponentsForPrismatic($page.params.resource)
	}

	function updateResourceForm(event: SubmitEvent) {
		try {
			updateResource(event)
			getData()
			toast.push("Updated resource price")
		} catch (e) {
			console.error(e)
		}
	}

	function updatePrismaticComponentsForm(event: SubmitEvent) {
		try {
			updatePrismaticComponents(event)
			getData()
			toast.push("Updated prismatic component prices")
		} catch (e) {
			console.error(e)
		}
	}

	function calculateProfitForm(event: SubmitEvent) {
		try {
			result = calculatePrismaticProfit(event)
			console.log(result)
		} catch (e) {
			console.error(e)
		}
	}
</script>

<svelte:head>
	<title>New World Crafting Calculator - {resource?.name}</title>
</svelte:head>

<a href="/" class="back"><Icon icon="mingcute:back-2-fill" /> <span>Back</span></a>

<div class="resource-wrapper">
	<div class="resource-options">
		<button
			on:click={() => {
				buttonState = "crafting"
			}}
			class:active={buttonState == "crafting"}>Crafting</button
		>
		<button
			on:click={() => {
				buttonState = "prices"
				result = undefined
			}}
			class:active={buttonState == "prices"}>Prices & Chances</button
		>
	</div>
	{#if buttonState == "prices"}
		<div class="crafting-wrapper">
			<div class="components-wrapper">
				<form on:submit|preventDefault={updateResourceForm}>
					<h1>{resource?.name} Price</h1>
					<div class="components">
						<div class="component">
							<img src="/assets/{resource?.image}" alt={resource?.name} draggable="false" />
							<h2>{resource?.name}</h2>
							<div class="input-group">
								<p>Market Price per Unit</p>
								<input
									type="number"
									step=".01"
									name={resource?.slug}
									value={resource?.market_price}
								/>
							</div>
							<div class="input-group">
								<p>Chance for Extra Crafts (%)</p>
								<input
									type="number"
									step=".01"
									name="chance_for_extra"
									value={resource?.chance_for_extra}
								/>
							</div>
						</div>
					</div>
					<button type="submit">Set prices</button>
				</form>
			</div>
			<div class="components-wrapper">
				<form on:submit|preventDefault={updatePrismaticComponentsForm}>
					<h1>Components Price</h1>
					<div class="components">
						{#each components as component}
							<div class="component">
								<img src="/assets/{component?.image}" alt={component?.name} draggable="false" />
								<h2>{component?.name}</h2>
								{#if component.market_price}
									<div class="input-group">
										<p>Market Price per Unit</p>
										<input
											type="number"
											step=".01"
											name={"marketprice-" + component?.slug}
											value={component?.market_price}
										/>
									</div>
								{/if}
								{#if component.chance_for_extra}
									<div class="input-group">
										<p>Chance for Extra Crafts (%)</p>
										<input
											type="number"
											step=".01"
											name={"chanceforextra-" + component.slug}
											value={component?.chance_for_extra}
										/>
									</div>
								{/if}
							</div>
						{/each}
					</div>
					<button type="submit">Set prices</button>
				</form>
			</div>
		</div>
	{:else}
		<div class="crafting-wrapper">
			<div class="components-wrapper">
				<form on:submit|preventDefault={calculateProfitForm}>
					<h1>Profit Calculator</h1>
					<div class="input-checkbox">
						<input type="checkbox" name="craftingother" bind:checked />
						<p>
							Did you craft 10x {components.filter((item) => item.isResource)[0]?.name}?
						</p>
					</div>
					{#if checked}
						<div class="input-range checkedbox">
							<p>
								How many {components.filter((item) => item.isResource)[0]?.name} did you get?
							</p>
							<input type="number" name="itemamount" value="10" min="10" />
						</div>
					{/if}
					<div class="input-range">
						<p>How many {resource?.name.toLowerCase() + "s"} are you crafting?</p>
						<div class="range-group checkedbox">
							<input type="number" name="craftingamount" min="1" max="10" value="1" />
						</div>
					</div>
					<input type="hidden" name="craftingitem" value={resource?.slug} />
					<button type="submit">Calculate Profit</button>
				</form>
			</div>
			{#if result}
				<div class="components-wrapper">
					<h1>Crafting Results</h1>
					<div class="stats">
						<h2>Total cost of materials: {result.totalCost}</h2>
						<h2>{resource?.name}s crafted: {result.craftingItemToRecieve}</h2>
						<h2>Revenue: {result.totalRevenue}</h2>
						<h2 class:green={result.profitBeforeTax > 0} class:red={result.profitBeforeTax < 0}>
							Profit before TP Tax: {result.profitBeforeTax}
						</h2>
						{#if result?.extraMaterials && result.extraMaterials.length > 0}
							<h2>
								Extra items:
								{#each result.extraMaterials as { name, amount, extra_profit_per_one }}
									{amount}
									{name.charAt(0).toUpperCase() + name.slice(1)} ({(
										extra_profit_per_one * amount
									).toFixed(2)}g)
								{/each}
							</h2>
							<span class="note"
								>* Note - Profit from extra items is already included in the calculation</span
							>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
