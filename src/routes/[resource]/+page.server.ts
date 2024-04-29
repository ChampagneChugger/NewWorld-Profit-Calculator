import itemsJSON from "$lib/data/items.json"
import componentsJSON from "$lib/data/components.json"
import recipesJSON from "$lib/data/recipes.json"
import { redirect, type Actions } from "@sveltejs/kit"
import * as fs from "fs"

export async function load({ params }) {
    const resource = itemsJSON.find(item => item.slug == params.resource)

    if (!resource) redirect(302, "/")

    const recipe = recipesJSON.find(item => item.name == resource.slug)

    if (!recipe) redirect(302, "/")

    const components = []

    for (const recipeItem of recipe.recipe) {
        const componentInfo = componentsJSON.find(item => item.slug == recipeItem.name)
        components.push(componentInfo)
    }

    return {
        resource,
        recipe: recipe.recipe,
        components
    }
}

export const actions: Actions = {
    set_component_price: async ({ request }) => {
        const data = Object.fromEntries(await request.formData())

        Object.entries(data).forEach(([component, value]) => {
            const componentIndex = componentsJSON.findIndex(item => item.slug == component)

            componentsJSON[componentIndex].market_price = Number(value)
        })

        fs.writeFile("./src/lib/data/components.json", JSON.stringify(componentsJSON, null, 2), (err) => {
            if (err) {
                return
            }
        })

        return {
            success: true
        }
    },
    set_item_price: async ({ request, params }) => {
        const data = Object.fromEntries(await request.formData())

        const itemIndex = itemsJSON.findIndex(item => item.slug == params.resource)

        if (params?.resource) {
            itemsJSON[itemIndex].market_price = Number(data[params.resource.toString()])
            itemsJSON[itemIndex].chance_for_extra = Number(data.chance_for_extra)
        }


        fs.writeFile("./src/lib/data/items.json", JSON.stringify(itemsJSON, null, 2), (err) => {
            if (err) {
                return
            }
        })

        return {
            success: true
        }
    },
    calculate: async ({ request, params }) => {
        const { wooden_coins } = Object.fromEntries(await request.formData()) as {
            wooden_coins: string
        }

        const resource = itemsJSON.find(item => item.slug == params.resource)
        const component = componentsJSON.find(item => item.slug == "wooden_coin")

        if (resource && component) {
            const resourcesCrafted = (Number(wooden_coins) * 10) * (1 + resource.chance_for_extra / 100)
            const goldInvested = Number(wooden_coins) * component.market_price
            const goldAfterSell = resourcesCrafted * resource.market_price
            const netProfit = goldAfterSell - goldInvested

            return {
                resourcesCrafted,
                goldInvested,
                goldAfterSell,
                netProfit
            }
        }
    }
}