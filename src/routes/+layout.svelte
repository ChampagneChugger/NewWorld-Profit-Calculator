<script lang="ts">
	import "$lib/styles/main.css"
	import { onMount } from "svelte"
	import { SvelteToast } from "@zerodevx/svelte-toast"

	const version: string = "1"

	function checkLocalStorage() {
		if (
			!localStorage.getItem("items") ||
			!localStorage.getItem("components") ||
			!localStorage.getItem("recipes") ||
			localStorage.getItem("version") != version
		) {
			setupLocalStorage()
		}
	}

	function setupLocalStorage() {
		localStorage.setItem(
			"items",
			JSON.stringify([
				{
					name: "Charcoal",
					slug: "charcoal",
					image: "charcoal.png",
					market_price: 0,
					chance_for_extra: 0
				}
			])
		)

		localStorage.setItem(
			"components",
			JSON.stringify([
				{
					name: "Wooden Coin",
					slug: "wooden_coin",
					image: "woodencoin.png",
					market_price: 0
				}
			])
		)

		localStorage.setItem(
			"recipes",
			JSON.stringify([
				{
					name: "charcoal",
					recipe: [
						{
							name: "wooden_coin",
							amount: 0
						},
						{
							name: "wooden_coin2",
							amount: 0
						}
					]
				}
			])
		)

		localStorage.setItem("version", version)

		location.reload()
	}

	onMount(() => {
		checkLocalStorage()
	})
</script>

<main>
	<slot />
	<SvelteToast options={{ duration: 2000, intro: { y: -64 }, initial: 0, next: 1 }} />
</main>
