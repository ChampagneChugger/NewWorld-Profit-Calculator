<script lang="ts">
	import Icon from "@iconify/svelte"
	import { onMount } from "svelte"
	import type { resource, component, result } from "$lib/types/all"
	import {
		getResource,
		getComponentsForResource,
		updateResource,
		updateComponents,
		getRelatedResourcesAndComponents,
		updateRelatedResources,
		calculateProfit
	} from "$lib/functions"
	import { toast } from "@zerodevx/svelte-toast"
	import { page } from "$app/stores"

	let buttonState: "crafting" | "prices" = "crafting"

	let resource: resource | undefined
	let components: component[] = []
	let relatedResources: resource[] = []
	let result: result | undefined

	onMount(() => {
		getData()
	})

	function getData() {
		resource = getResource($page.params.resource)
		components = getComponentsForResource($page.params.resource)
		relatedResources = getRelatedResourcesAndComponents($page.params.resource)
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

	function updateRelatedResourcesForm(event: SubmitEvent) {
		try {
			updateRelatedResources(event)
			getData()
			toast.push("Updated related resource prices")
		} catch (e) {
			console.error(e)
		}
	}

	function calculateProfitForm(event: SubmitEvent) {
		try {
			result = calculateProfit(event)
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
		<div class="crafting-wrapper">
			<div class="components-wrapper">
				<form on:submit|preventDefault>
					<h1>Profit Calculator</h1>
					<div class="components">
						{#if relatedResources.length > 0}
							<form on:submit|preventDefault={calculateProfitForm}>
								{#each relatedResources as resource}
									{#if resource?.show == undefined}
										<div class="component">
											<img src="/assets/{resource.image}" alt={resource.name} draggable="false" />
											<h2>{resource.name}</h2>
											<div class="input-group">
												<p>Amount of {resource.name}s used</p>
												<input
													type="number"
													name={resource.slug}
													placeholder="Amount of {resource.name.toLowerCase()}s used"
												/>
												<input type="hidden" name="final_item" value={$page.params.resource} />
											</div>
										</div>
									{/if}
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
						<h2>Resources used: {result.itemsUsed}</h2>
						<h2>Money spent on resources: {result.moneyInvested}</h2>
						<h2>{resource?.name} crafted: {result.itemsCrafted}</h2>
						<h2>{resource?.name} revenue before TP tax: {result.revenue}</h2>
						<h2>
							Profit: <span class:green={result.profit > 0} class:red={result.profit < 0}
								>{result.profit}</span
							>
						</h2>
					</div>
				</div>
			{/if}
		</div>
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
			{#if components.length > 0}
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
											name="marketprice-{component?.slug}"
											value={component?.market_price}
										/>
									</div>
								</div>
							{/each}
						</div>
						<button type="submit">Set prices</button>
					</form>
				</div>
			{:else}
				{#if relatedResources.filter((item) => item?.show != undefined).length > 0}
					<div class="components-wrapper">
						<form on:submit|preventDefault={updateRelatedResourcesForm}>
							<h1>Resource Prices</h1>
							<div class="components">
								{#each relatedResources as resource}
									{#if resource?.show != undefined}
										<div class="component">
											<img src="/assets/{resource?.image}" alt={resource?.name} draggable="false" />
											<h2>{resource?.name}</h2>
											<div class="input-group">
												<p>Chance for Extra Crafts (%)</p>
												<input
													type="number"
													step=".01"
													name="chanceforextra-{resource.slug}"
													value={resource?.chance_for_extra}
												/>
											</div>
										</div>
									{/if}
								{/each}
							</div>
							<button type="submit">Set prices</button>
						</form>
					</div>
				{/if}
				{#if relatedResources.filter((item) => item?.show == undefined).length > 0}
					<div class="components-wrapper">
						<form on:submit|preventDefault={updateComponentsForm}>
							<h1>Component Prices</h1>
							<div class="components">
								{#each relatedResources as resource}
									{#if resource?.show == undefined}
										<div class="component">
											<img src="/assets/{resource?.image}" alt={resource?.name} draggable="false" />
											<h2>{resource?.name}</h2>
											<div class="input-group">
												<p>Market Price per Unit</p>
												<input
													type="number"
													step=".01"
													name="marketprice-{resource?.slug}"
													value={resource?.market_price}
												/>
											</div>
										</div>
									{/if}
								{/each}
							</div>
							<button type="submit">Set prices</button>
						</form>
					</div>
				{/if}
			{/if}
		</div>
	{/if}
</div>
