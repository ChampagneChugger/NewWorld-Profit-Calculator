<script lang="ts">
	import Icon from "@iconify/svelte"
	import { onMount } from "svelte"
	import type { resource, component } from "$lib/types/all"
	import { getResource, updateResource, getComponentsForPrismatic } from "$lib/functions"
	import { page } from "$app/stores"
	import { toast } from "@zerodevx/svelte-toast"

	let resource: resource | undefined
	let components: component[] & resource[] = []
	let buttonState: "crafting" | "prices" = "prices"

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
			}}
			class:active={buttonState == "prices"}>Prices</button
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
				<form on:submit|preventDefault={updateResourceForm}>
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
											name={component?.slug}
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
											name="chance_for_extra"
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
	{/if}
</div>
