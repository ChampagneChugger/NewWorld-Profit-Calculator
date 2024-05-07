<script lang="ts">
	import "$lib/styles/main.css"
	import { onMount } from "svelte"
	import { SvelteToast } from "@zerodevx/svelte-toast"

	const version: string = "3"

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
				},
				{
					name: "Earth Quintessence",
					slug: "earth_quintessence",
					image: "earthquintessence.png",
					market_price: 40,
					chance_for_extra: 25,
					show: true
				},
				{
					name: "Earth Essence",
					slug: "earth_essence",
					image: "earthessence.png",
					chance_for_extra: 20,
					show: false
				},
				{
					name: "Earth Wisp",
					slug: "earth_wisp",
					image: "earthwisp.png",
					chance_for_extra: 10,
					show: false
				},
				{
					name: "Fire Quintessence",
					slug: "fire_quintessence",
					image: "firequintessence.png",
					market_price: 40,
					chance_for_extra: 25,
					show: true
				},
				{
					name: "Fire Essence",
					slug: "fire_essence",
					image: "fireessence.png",
					chance_for_extra: 20,
					show: false
				},
				{
					name: "Fire Wisp",
					slug: "fire_wisp",
					image: "firewisp.png",
					chance_for_extra: 10,
					show: false
				},
				{
					name: "Air Quintessence",
					slug: "air_quintessence",
					image: "airquintessence.png",
					market_price: 40,
					chance_for_extra: 25,
					show: true
				},
				{
					name: "Air Essence",
					slug: "air_essence",
					image: "airessence.png",
					chance_for_extra: 20,
					show: false
				},
				{
					name: "Air Wisp",
					slug: "air_wisp",
					image: "airwisp.png",
					chance_for_extra: 10,
					show: false
				},
				{
					name: "Water Quintessence",
					slug: "water_quintessence",
					image: "waterquintessence.png",
					market_price: 40,
					chance_for_extra: 25,
					show: true
				},
				{
					name: "Water Essence",
					slug: "water_essence",
					image: "wateressence.png",
					chance_for_extra: 20,
					show: false
				},
				{
					name: "Water Wisp",
					slug: "water_wisp",
					image: "waterwisp.png",
					chance_for_extra: 10,
					show: false
				},
				{
					name: "Soul Quintessence",
					slug: "soul_quintessence",
					image: "soulquintessence.png",
					market_price: 40,
					chance_for_extra: 25,
					show: true
				},
				{
					name: "Soul Essence",
					slug: "soul_essence",
					image: "soulessence.png",
					chance_for_extra: 20,
					show: false
				},
				{
					name: "Soul Wisp",
					slug: "soul_wisp",
					image: "soulwisp.png",
					chance_for_extra: 10,
					show: false
				},
				{
					name: "Life Quintessence",
					slug: "life_quintessence",
					image: "lifequintessence.png",
					market_price: 40,
					chance_for_extra: 25,
					show: true
				},
				{
					name: "Life Essence",
					slug: "life_essence",
					image: "lifeessence.png",
					chance_for_extra: 20,
					show: false
				},
				{
					name: "Life Wisp",
					slug: "life_wisp",
					image: "lifewisp.png",
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
				},
				{
					name: "Earth Mote",
					slug: "earth_mote",
					image: "earthmote.png",
					market_price: 0.35
				},
				{
					name: "Fire Mote",
					slug: "fire_mote",
					image: "firemote.png",
					market_price: 0.35
				},
				{
					name: "Air Mote",
					slug: "air_mote",
					image: "airmote.png",
					market_price: 0.35
				},
				{
					name: "Water Mote",
					slug: "water_mote",
					image: "watermote.png",
					market_price: 0.35
				},
				{
					name: "Soul Mote",
					slug: "soul_mote",
					image: "soulmote.png",
					market_price: 0.35
				},
				{
					name: "Life Mote",
					slug: "life_mote",
					image: "lifemote.png",
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
				},
				{
					name: "earth_quintessence",
					recipe: [
						{
							name: "earth_essence",
							amount: 3
						}
					]
				},
				{
					name: "earth_essence",
					recipe: [
						{
							name: "earth_wisp",
							amount: 4
						}
					]
				},
				{
					name: "earth_wisp",
					recipe: [
						{
							name: "earth_mote",
							amount: 5
						}
					]
				},
				{
					name: "fire_quintessence",
					recipe: [
						{
							name: "fire_essence",
							amount: 3
						}
					]
				},
				{
					name: "fire_essence",
					recipe: [
						{
							name: "fire_wisp",
							amount: 4
						}
					]
				},
				{
					name: "fire_wisp",
					recipe: [
						{
							name: "fire_mote",
							amount: 5
						}
					]
				},
				{
					name: "air_quintessence",
					recipe: [
						{
							name: "air_essence",
							amount: 3
						}
					]
				},
				{
					name: "air_essence",
					recipe: [
						{
							name: "air_wisp",
							amount: 4
						}
					]
				},
				{
					name: "air_wisp",
					recipe: [
						{
							name: "air_mote",
							amount: 5
						}
					]
				},
				{
					name: "water_quintessence",
					recipe: [
						{
							name: "water_essence",
							amount: 3
						}
					]
				},
				{
					name: "water_essence",
					recipe: [
						{
							name: "water_wisp",
							amount: 4
						}
					]
				},
				{
					name: "water_wisp",
					recipe: [
						{
							name: "water_mote",
							amount: 5
						}
					]
				},
				{
					name: "soul_quintessence",
					recipe: [
						{
							name: "soul_essence",
							amount: 3
						}
					]
				},
				{
					name: "soul_essence",
					recipe: [
						{
							name: "soul_wisp",
							amount: 4
						}
					]
				},
				{
					name: "soul_wisp",
					recipe: [
						{
							name: "soul_mote",
							amount: 5
						}
					]
				},
				{
					name: "life_quintessence",
					recipe: [
						{
							name: "life_essence",
							amount: 3
						}
					]
				},
				{
					name: "life_essence",
					recipe: [
						{
							name: "life_wisp",
							amount: 4
						}
					]
				},
				{
					name: "life_wisp",
					recipe: [
						{
							name: "life_mote",
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
