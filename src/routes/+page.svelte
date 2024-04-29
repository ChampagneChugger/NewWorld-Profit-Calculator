<script lang="ts">
	import Resource from "$lib/components/resource.svelte"
	import itemsJSON from "$lib/data/items.json"
</script>

<svelte:head>
	<title>New World Crafting Calculator</title>
</svelte:head>

<div class="home">
	<h1>Select a resource</h1>
	<div class="resources">
		{#each itemsJSON as { name, slug, image }}
			<Resource resource={{ name, slug, image }} />
		{/each}
	</div>
</div>
