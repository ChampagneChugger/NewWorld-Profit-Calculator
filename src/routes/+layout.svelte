<script lang="ts">
	import "$lib/styles/main.css"
	import { onMount } from "svelte"
	import { SvelteToast } from "@zerodevx/svelte-toast"

	const version: string = "2"

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
					market_price: 0.15,
					chance_for_extra: 35,
					show: true
				},
				{
					name: "Death Quintessence",
					slug: "death_quintessence",
					image: "deathquintessence.png",
					market_price: 40,
					chance_for_extra: 25,
					show: true
				},
				{
					name: "Death Essence",
					slug: "death_essence",
					image: "deathessence.png",
					chance_for_extra: 20,
					show: false
				},
				{
					name: "Death Wisp",
					slug: "death_wisp",
					image: "deathwisp.png",
					chance_for_extra: 10,
					show: false
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
					market_price: 0.87
				},
				{
					name: "Death Mote",
					slug: "death_mote",
					image: "deathmote.png",
					market_price: 0.35
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
							amount: 0.1
						}
					]
				},
				{
					name: "death_quintessence",
					recipe: [
						{
							name: "death_essence",
							amount: 3
						}
					]
				},
				{
					name: "death_essence",
					recipe: [
						{
							name: "death_wisp",
							amount: 4
						}
					]
				},
				{
					name: "death_wisp",
					recipe: [
						{
							name: "death_mote",
							amount: 5
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
