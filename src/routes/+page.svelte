<script lang="ts">
	import Resource from "$lib/components/resource.svelte"
	import { getResources } from "$lib/functions"
	import { onMount } from "svelte"
	import type { resource } from "$lib/types/all"

	let items: resource[] = []

	onMount(() => {
		items = getResources()
	})
</script>

<svelte:head>
	<title>New World Crafting Calculator</title>
</svelte:head>

<div class="home">
	<h1>Select a resource</h1>
	<div class="resources">
		{#if items.length > 0}
			{#each items as { name, slug, image, show }}
				{#if show == true}
					<Resource resource={{ name, slug, image }} />
				{/if}
			{/each}
		{/if}
	</div>
</div>
