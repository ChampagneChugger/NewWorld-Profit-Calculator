<script lang="ts">
	import { page } from "$app/stores"
	import { enhance } from "$app/forms"
	import Icon from "@iconify/svelte"

	export let data
	export let form

	$: param = $page.params.resource
	$: resource = data.resource
	$: components = data.components
	$: recipe = data.recipe

	let buttonState: "crafting" | "recipe" = "crafting"
</script>

<svelte:head>
	<title>New World Crafting Calculator - {param[0].toUpperCase() + param.slice(1)}</title>
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
				buttonState = "recipe"
			}}
			class:active={buttonState == "recipe"}>Recipe</button
		>
	</div>
	{#if buttonState == "crafting"}
		<div class="crafting-wrapper">
			<div class="components-wrapper">
				<form
					use:enhance={() => {
						return async ({ update }) => {
							update({ reset: false })
						}
					}}
					method="POST"
					action="?/set_item_price"
				>
					<h1>{resource.name} Price</h1>
					<div class="components">
						<div class="component">
							<img src="/assets/{resource.image}" alt={resource.name} draggable="false" />
							<h2>{resource.name}</h2>
							<div class="input-group">
								<p>Market Price per Unit</p>
								<input type="text" name={resource.slug} value={resource.market_price} />
							</div>
							<div class="input-group">
								<p>Chance for Extra Crafts (%)</p>
								<input type="text" name="chance_for_extra" value={resource.chance_for_extra} />
							</div>
						</div>
					</div>
					<button type="submit">Set prices</button>
				</form>
			</div>
			<div class="components-wrapper">
				<form
					use:enhance={() => {
						return async ({ update }) => {
							update({ reset: false })
						}
					}}
					method="POST"
					action="?/set_component_price"
				>
					<h1>Component Prices</h1>
					<div class="components">
						{#each components as component}
							<div class="component">
								<img src="/assets/{component?.image}" alt={component?.name} draggable="false" />
								<h2>{component?.name}</h2>
								<div class="input-group">
									<p>Market Price per Unit</p>
									<input type="text" name={component?.slug} value={component?.market_price} />
								</div>
							</div>
						{/each}
					</div>
					<button type="submit">Set prices</button>
				</form>
			</div>
			<div class="calculate-wrapper">
				<form action="?/calculate" method="POST" use:enhance>
					<input type="text" name="wooden_coins" placeholder="Wooden Coin Amount" />
					<button type="submit">Submit</button>
				</form>
				{#if form}
					<h1>Expected Charcoal: {form.resourcesCrafted}</h1>
					<h1>Gold Invested: {form.goldInvested}</h1>
					<h1>Gold after sell: {form.goldAfterSell}</h1>
					<h1>Net profit: {form.netProfit}</h1>
				{/if}
			</div>
		</div>
	{/if}
</div>
