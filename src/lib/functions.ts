import type { resource, recipe, recipeItem, component } from "$lib/types/all"

export function getResources(): resource[] {
    return JSON.parse(localStorage.getItem("items") ?? "")
}

export function getResource(resource: string): resource | undefined {
    const items = getResources()

    return items.find(item => item.slug == resource) ?? undefined
}

function getRecipes(): recipeItem[] {
    return JSON.parse(localStorage.getItem("recipes") ?? "")
}

function getRecipe(resource: string): recipe[] | undefined {
    const recipes = getRecipes()

    return recipes.find(item => item.name == resource)?.recipe ?? undefined
}

function getComponents(): component[] {
    return JSON.parse(localStorage.getItem("components") ?? "")
}

export function getComponentsForResource(resource: string): component[] {
    const components = getComponents()
    const componentsNeeded = getRecipe(resource)

    const componentsToReturn: component[] = []

    if (componentsNeeded) {
        for (const component of componentsNeeded) {
            const componentInfo = components.find(item => item.slug == component.name)

            if (componentInfo) componentsToReturn.push(componentInfo)
        }
    }

    return componentsToReturn
}

export function updateResource(event: SubmitEvent) {
    const formElement: HTMLFormElement = event.target as HTMLFormElement

    const formData = new FormData(formElement)

    const chance_for_extra: FormDataEntryValue | null = formData.get("chance_for_extra")

    const items = getResources()

    for (const pair of formData.entries()) {
        if (pair[0] != "chance_for_extra") {
            const itemIndex: number = items.findIndex(item => item.slug == pair[0])

            items[itemIndex].market_price = Number(pair[1])
            items[itemIndex].chance_for_extra = Number(chance_for_extra)

            localStorage.setItem("items", JSON.stringify(items))
        }
    }
}

export function updateComponents(event: SubmitEvent) {
    const formElement: HTMLFormElement = event.target as HTMLFormElement

    const formData = new FormData(formElement)

    const components = getComponents()

    for (const pair of formData.entries()) {
        const componentIndex: number = components.findIndex(item => item.slug == pair[0])

        components[componentIndex].market_price = Number(pair[1])

        localStorage.setItem("components", JSON.stringify(components))
    }
}

export function calculateCharcoalProfit(event: SubmitEvent) {
    const formElement: HTMLFormElement = event.target as HTMLFormElement

    const formData = new FormData(formElement)

    const resource = getResource("charcoal")
    const components = getComponents()

    if (resource) {
        for (const pair of formData.entries()) {
            const componentIndex: number = components.findIndex(item => item.slug == pair[0])

            const amountOfCoins: number = Number(pair[1])
            const costOfCoins: number = Number((amountOfCoins * components[componentIndex].market_price).toFixed(2))
            const charcoalAmount: number = Math.floor((amountOfCoins * 10) * (1 + resource.chance_for_extra / 100))
            const charcoalRevenue: number = Number((charcoalAmount * resource.market_price).toFixed(2))
            const earnings: number = Number((charcoalRevenue - costOfCoins).toFixed(2))

            return {
                amountOfCoins,
                costOfCoins,
                charcoalAmount,
                charcoalRevenue,
                earnings
            }
        }
    }
}