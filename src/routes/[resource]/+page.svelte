<script lang="ts">
	import Icon from "@iconify/svelte"
	import { onMount } from "svelte"
	import type { resource, component, result } from "$lib/types/all"
	import {
		getResource,
		getComponentsForResource,
		updateResource,
		updateComponents,
		calculateCharcoalProfit
	} from "$lib/functions"
	import { toast } from "@zerodevx/svelte-toast"
	import { onNavigate } from "$app/navigation"

	let buttonState: "crafting" | "prices" = "crafting"

	let resource: resource | undefined
	let components: component[] = []
	let result: result | undefined

	onMount(() => {
		getData()
	})

	function getData() {
		resource = getResource("charcoal")
		components = getComponentsForResource("charcoal")
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

	function updateComponentsForm(event: SubmitEvent) {
		try {
			updateComponents(event)
			getData()
			toast.push("Updated component prices")
		} catch (e) {
			console.error(e)
		}
	}

	function calculateCharcoal(event: SubmitEvent) {
		try {
			result = calculateCharcoalProfit(event)
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
			class:active={buttonState == "prices"}>Prices</button
		>
	</div>
	{#if buttonState == "crafting"}
		{#if resource?.slug == "charcoal"}
			<div class="crafting-wrapper">
				<div class="components-wrapper">
					<form on:submit|preventDefault>
						<h1>Profit Calculator</h1>
						<div class="components">
							{#if components.length > 0}
								<form on:submit|preventDefault={calculateCharcoal}>
									{#each components as { name, image, slug }}
										<div class="component">
											<img src="/assets/{image}" alt={name} draggable="false" />
											<h2>{name}</h2>
											<div class="input-group">
												<p>Amount of {name} used</p>
												<input
													type="number"
													name={slug}
													placeholder="Amount of {name.toLowerCase()} used"
												/>
											</div>
										</div>
									{/each}
									<button type="submit">Calculate Profit</button>
								</form>
							{/if}
						</div>
					</form>
				</div>
				{#if result}
					<div class="components-wrapper">
						<h1>Crafting Results</h1>
						<div class="stats">
							<h2>Wooden Coins used: {result.amountOfCoins}</h2>
							<h2>Money spent on wooden coins: {result.costOfCoins}</h2>
							<h2>Charcoal crafted: {result.charcoalAmount}</h2>
							<h2>Charcoal revenue before TP tax: {result.charcoalRevenue}</h2>
							<h2>
								Profit: <span class:green={result.earnings > 0} class:red={result.earnings < 0}
									>{result.earnings}</span
								>
							</h2>
						</div>
					</div>
				{/if}
			</div>
		{/if}
	{:else}
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
				<form on:submit|preventDefault={updateComponentsForm}>
					<h1>Component Prices</h1>
					<div class="components">
						{#each components as component}
							<div class="component">
								<img src="/assets/{component?.image}" alt={component?.name} draggable="false" />
								<h2>{component?.name}</h2>
								<div class="input-group">
									<p>Market Price per Unit</p>
									<input
										type="number"
										step=".01"
										name={component?.slug}
										value={component?.market_price}
									/>
								</div>
							</div>
						{/each}
					</div>
					<button type="submit">Set prices</button>
				</form>
			</div>
		</div>
	{/if}
</div>
