<script lang="ts">
	import "$lib/styles/main.css"
	import { onMount } from "svelte"
	import { SvelteToast } from "@zerodevx/svelte-toast"

	const version: string = "5"

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
				},
				{
					name: "Prismatic Ingot",
					slug: "prismatic_ingot",
					image: "prismaticingot.png",
					chance_for_extra: 10,
					show: true,
					prismatic: true,
					market_price: 208
				},
				{
					name: "Prismatic Block",
					slug: "prismatic_block",
					image: "prismaticblock.png",
					chance_for_extra: 10,
					show: true,
					prismatic: true,
					market_price: 306
				},
				{
					name: "Prismatic Leather",
					slug: "prismatic_leather",
					image: "prismaticleather.png",
					chance_for_extra: 10,
					show: true,
					prismatic: true,
					market_price: 218
				},
				{
					name: "Prismatic Planks",
					slug: "prismatic_planks",
					image: "prismaticplanks.png",
					chance_for_extra: 10,
					show: true,
					prismatic: true,
					market_price: 198
				},
				{
					name: "Prismatic Cloth",
					slug: "prismatic_cloth",
					image: "prismaticcloth.png",
					chance_for_extra: 10,
					show: true,
					prismatic: true,
					market_price: 215
				},
				{
					name: "Asmodeum",
					slug: "asmodeum",
					image: "asmodeum.png",
					chance_for_extra: 10,
					market_price: 39.39,
					show: false,
					isResource: true
				},
				{
					name: "Runic Leather",
					slug: "runic_leather",
					image: "runicleather.png",
					chance_for_extra: 10,
					market_price: 44.93,
					show: false,
					isResource: true
				},
				{
					name: "Phoenixweave",
					slug: "phoenixweave",
					image: "phoenixweave.png",
					chance_for_extra: 10,
					market_price: 47.49,
					show: false,
					isResource: true
				},
				{
					name: "Glittering Ebony",
					slug: "glittering_ebony",
					image: "glitteringebony.png",
					chance_for_extra: 10,
					market_price: 18,
					show: false,
					isResource: true
				},
				{
					name: "Runestone",
					slug: "runestone",
					image: "runestone.png",
					chance_for_extra: 10,
					market_price: 58.88,
					show: false,
					isResource: true
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
					name: "Obsidian Voidstone",
					slug: "obsidian_voidstone",
					image: "obsidianvoidstone.png",
					market_price: 43.72
				},
				{
					name: "Spinweave Cloth",
					slug: "spinweave_cloth",
					image: "spinweavecloth.png",
					market_price: 16.67
				},
				{
					name: "Wireweave",
					slug: "wireweave",
					image: "wireweave.png",
					market_price: 0.11
				},
				{
					name: "Infused Silk",
					slug: "infusedsilk",
					image: "infusedsilk.png",
					market_price: 7.7
				},
				{
					name: "Scalecloth",
					slug: "scalecloth",
					image: "scalecloth.png",
					market_price: 3.46
				},
				{
					name: "Blisterweave",
					slug: "blisterweave",
					image: "blisterweave.png",
					market_price: 3.29
				},
				{
					name: "Runewood Planks",
					slug: "runewoodplanks",
					image: "runewoodplanks.png",
					market_price: 16.98
				},
				{
					name: "Ironwood Planks",
					slug: "ironwoodplanks",
					image: "ironwoodplanks.png",
					market_price: 9.97
				},
				{
					name: "Runic Voidstone",
					slug: "runicvoidstone",
					image: "runicvoidstone.png",
					market_price: 74.95
				},
				{
					name: "Pure Solvent",
					slug: "puresolvent",
					image: "puresolvent.png",
					market_price: 0.08
				},
				{
					name: "Wildwood",
					slug: "wildwood",
					image: "wildwood.png",
					market_price: 2.96
				},
				{
					name: "Barbvine",
					slug: "barbvine",
					image: "barbvine.png",
					market_price: 2.8
				},
				{
					name: "Obsidian Sandpaper",
					slug: "obsidiansandpaper",
					image: "obsidiansandpaper.png",
					market_price: 0.13
				},
				{
					name: "Mythril Ingot",
					slug: "mythril_ingot",
					image: "mythrilingot.png",
					market_price: 14
				},
				{
					name: "Infused Leather",
					slug: "infused_leather",
					image: "infusedleather.png",
					market_price: 6.67
				},
				{
					name: "Smolderhide",
					slug: "smolderhide",
					image: "smolderhide.png",
					market_price: 4.08
				},
				{
					name: "Aged Tannin",
					slug: "agedtannin",
					image: "agedtannin.png",
					market_price: 0.16
				},
				{
					name: "Dark Leather",
					slug: "darkleather",
					image: "darkleather.png",
					market_price: 13.98
				},
				{
					name: "Gleaming Lodestone",
					slug: "gleaminglodestone",
					image: "gleaminglodestone.png",
					market_price: 0.94
				},
				{
					name: "Scarhide",
					slug: "scarhide",
					image: "scarhide.png",
					market_price: 3.94
				},
				{
					name: "Obsidian Flux",
					slug: "obsidian_flux",
					image: "obsidianflux.png",
					market_price: 0.2
				},
				{
					name: "Orichalcum Ingot",
					slug: "orichalcum_ingot",
					image: "oriingot.png",
					market_price: 9
				},
				{
					name: "Tolvium",
					slug: "tolvium",
					image: "tolvium.png",
					market_price: 4
				},
				{
					name: "Cinnabar",
					slug: "cinnabar",
					image: "cinnabar.png",
					market_price: 4.1
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
				},
				{
					name: "prismatic_ingot",
					recipe: [
						{
							name: "asmodeum",
							amount: 1,
							isResource: true
						},
						{
							name: "mythril_ingot",
							amount: 10
						},
						{
							name: "charcoal",
							amount: 4
						},
						{
							name: "obsidian_flux",
							amount: 4
						}
					]
				},
				{
					name: "asmodeum",
					recipe: [
						{
							name: "orichalcum_ingot",
							amount: 5
						},
						{
							name: "tolvium",
							amount: 1
						},
						{
							name: "cinnabar",
							amount: 1
						},
						{
							name: "charcoal",
							amount: 2
						},
						{
							name: "obsidian_flux",
							amount: 1
						}
					]
				},
				{
					name: "prismatic_leather",
					recipe: [
						{
							name: "runic_leather",
							amount: 1,
							isResource: true
						},
						{
							name: "darkleather",
							amount: 12
						},
						{
							name: "agedtannin",
							amount: 4
						}
					]
				},
				{
					name: "runic_leather",
					recipe: [
						{
							name: "infused_leather",
							amount: 5
						},
						{
							name: "smolderhide",
							amount: 1
						},
						{
							name: "scarhide",
							amount: 1
						},
						{
							name: "agedtannin",
							amount: 1
						}
					]
				},
				{
					name: "prismatic_cloth",
					recipe: [
						{
							name: "phoenixweave",
							amount: 1,
							isResource: true
						},
						{
							name: "spinweave_cloth",
							amount: 10
						},
						{
							name: "wireweave",
							amount: 4
						}
					]
				},
				{
					name: "phoenixweave",
					recipe: [
						{
							name: "infusedsilk",
							amount: 5
						},
						{
							name: "scalecloth",
							amount: 1
						},
						{
							name: "blisterweave",
							amount: 1
						},
						{
							name: "wireweave",
							amount: 1
						}
					]
				},
				{
					name: "prismatic_planks",
					recipe: [
						{
							name: "glittering_ebony",
							amount: 1,
							isResource: true
						},
						{
							name: "runewoodplanks",
							amount: 10
						},
						{
							name: "obsidiansandpaper",
							amount: 4
						}
					]
				},
				{
					name: "glittering_ebony",
					recipe: [
						{
							name: "ironwoodplanks",
							amount: 5
						},
						{
							name: "wildwood",
							amount: 1
						},
						{
							name: "barbvine",
							amount: 1
						},
						{
							name: "obsidiansandpaper",
							amount: 1
						}
					]
				},
				{
					name: "prismatic_block",
					recipe: [
						{
							name: "runestone",
							amount: 1,
							isResource: true
						},
						{
							name: "runicvoidstone",
							amount: 5
						},
						{
							name: "puresolvent",
							amount: 4
						}
					]
				},
				{
					name: "runestone",
					recipe: [
						{
							name: "obsidian_voidstone",
							amount: 5
						},
						{
							name: "obsidiansandpaper",
							amount: 1
						},
						{
							name: "gleaminglodestone",
							amount: 1
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
