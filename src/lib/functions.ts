import type { resource, recipe, recipeItem, component, result, prismaticResult } from "$lib/types/all"

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

function getComponent(component: string): component | undefined {
    const components = getComponents()

    return components.find(item => item.slug == component)
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

export function getComponentsForPrismatic(resource: string): component[] & resource[] {
    let recipe = getRecipe(resource)

    const items: component[] & resource[] = []

    if (recipe) {
        for (const item of recipe) {
            if (item.isResource) {
                recipe = [...recipe, ...getRecipe(item.name) ?? []]
            }
        }

        for (const item of recipe) {
            const foundItem = getResource(item.name) ?? getComponent(item.name)

            if (foundItem && !items.find(innerItem => innerItem.slug == item.name)) {
                items.push(foundItem)
            }
        }
    }

    return items
}

export function getRelatedResourcesAndComponents(resource: string): resource[] {
    let recipeItem: recipe[] | undefined = getRecipe(resource)
    const resources: resource[] = []

    while (recipeItem) {
        const resource = getResource(recipeItem[0].name) ?? getComponent(recipeItem[0].name)
        //@ts-expect-error I don't know how to define this type
        resources.push(resource)
        recipeItem = getRecipe(recipeItem[0].name)
    }

    return resources
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

export function updateRelatedResources(event: SubmitEvent) {
    const formElement: HTMLFormElement = event.target as HTMLFormElement

    const formData = new FormData(formElement)

    const items = getResources()

    formData.forEach((value, name) => {
        const splitValues = name.split("-")

        const itemIndex: number = items.findIndex(item => item.slug == splitValues[1])

        items[itemIndex].chance_for_extra = Number(value)

        localStorage.setItem("items", JSON.stringify(items))
    })
}

export function updateComponents(event: SubmitEvent) {
    const formElement: HTMLFormElement = event.target as HTMLFormElement

    const formData = new FormData(formElement)

    const components = getComponents()

    formData.forEach((value, name) => {
        const splitValues = name.split("-")

        const componentIndex: number = components.findIndex(item => item.slug == splitValues[1])

        components[componentIndex].market_price = Number(value)

        localStorage.setItem("components", JSON.stringify(components))
    })
}

export function updatePrismaticComponents(event: SubmitEvent) {
    const formElement: HTMLFormElement = event.target as HTMLFormElement

    const formData = new FormData(formElement)

    const resources = getResources()
    const components = getComponents()

    formData.forEach((value, name) => {
        const splitValues = name.split("-")

        const resourceIndex: number = resources.findIndex(item => item.slug == splitValues[1])

        if (resourceIndex >= 0) {
            if (splitValues[0] == "chanceforextra") {
                resources[resourceIndex].chance_for_extra = Number(value)
            } else {
                resources[resourceIndex].market_price = Number(value)
            }

            localStorage.setItem("items", JSON.stringify(resources))
        } else {
            const componentIndex: number = components.findIndex(item => item.slug == splitValues[1])

            components[componentIndex].market_price = Number(value)

            localStorage.setItem("components", JSON.stringify(components))
        }

    })
}

export function calculateProfit(event: SubmitEvent): result {
    const formElement: HTMLFormElement = event.target as HTMLFormElement

    const formData = new FormData(formElement)

    const final_item: FormDataEntryValue | null = formData.get("final_item")

    const [name, amount] = formData.entries().next().value

    return getStats(name, amount, final_item)
}

export function calculatePrismaticProfit(event: SubmitEvent): prismaticResult | undefined {
    const formElement: HTMLFormElement = event.target as HTMLFormElement

    const formData = new FormData(formElement)

    const { craftingother, craftingitem, craftingamount, itemamount } = Object.fromEntries(formData) as {
        craftingother: string,
        craftingitem: string,
        craftingamount: string,
        itemamount: string
    }

    const resource = getResource(craftingitem)

    if (resource) {
        const recipe = getRecipe(craftingitem)

        let totalCost: number = 0
        const extraMaterials = []

        if (craftingother) {
            if (recipe) {
                const other = recipe.find(item => item.isResource)?.name

                if (other) {
                    const otherInfo = getResource(other)
                    const otherRecipe = getRecipe(other)

                    // Calculate cost of crafting other item
                    if (otherRecipe && otherInfo) {
                        for (const item of otherRecipe) {
                            const itemInfo = getResource(item.name) ?? getComponent(item.name)

                            if (itemInfo) {
                                totalCost += item.amount * itemInfo.market_price
                            }
                        }

                        // Times 10 because above calculates for 1 asmodeum
                        totalCost *= 10

                        if (Number(itemamount) - 10 > 0) {
                            extraMaterials.push({
                                name: other,
                                amount: Number(itemamount) - 10,
                                extra_profit_per_one: otherInfo.market_price
                            })
                        }
                    }
                }

                for (const item of recipe) {
                    const itemInfo = getResource(item.name) ?? getComponent(item.name)

                    if (itemInfo && itemInfo.slug != other) {
                        totalCost += itemInfo?.market_price * item.amount * Number(craftingamount)
                    }
                }

                totalCost = Number(totalCost.toFixed(2))
                const craftingItemToRecieve: number = Math.round(Number(craftingamount) * (1 + (resource.chance_for_extra / 100)))
                const totalRevenue: number = Number((craftingItemToRecieve * resource.market_price).toFixed(2))
                let profitBeforeTax: number = Number((totalRevenue - totalCost).toFixed(2))

                for (const extra of extraMaterials) {
                    profitBeforeTax += Number((extra.amount * extra.extra_profit_per_one).toFixed(2))
                }

                return {
                    totalCost,
                    craftingItemToRecieve,
                    totalRevenue,
                    profitBeforeTax: Number(profitBeforeTax.toFixed(2)),
                    extraMaterials
                }
            }
        } else {
            if (recipe) {
                for (const item of recipe) {
                    const itemInfo = getResource(item.name) ?? getComponent(item.name)

                    if (itemInfo) {
                        totalCost += itemInfo?.market_price * item.amount * Number(craftingamount)
                    }
                }
            }

            totalCost = Number(totalCost.toFixed(2))
            const craftingItemToRecieve: number = Math.round(Number(craftingamount) * (1 + (resource.chance_for_extra / 100)))
            const totalRevenue: number = Number((craftingItemToRecieve * resource.market_price).toFixed(2))
            const profitBeforeTax: number = Number((totalRevenue - totalCost).toFixed(2))

            return {
                totalCost,
                craftingItemToRecieve,
                totalRevenue,
                profitBeforeTax
            }
        }
    }
}

function getStats(resource: string, amount: number, final_item: FormDataEntryValue | null): result {
    let recipe = getRecipes().filter(item => item.recipe.find(item => item.name == resource))

    let resourceItem: resource | undefined = getResource(recipe[0].name)

    const itemsUsed: number = Number(amount)

    while (recipe.length > 0) {
        const canCraft: number = Math.floor(Number(amount) / recipe[0].recipe[0].amount)
        //@ts-expect-error Goofy TS
        amount = Math.floor(canCraft * (1 + resourceItem.chance_for_extra / 100))

        recipe = getRecipes().filter(item => item.recipe.find(item => item.name == resourceItem?.slug))

        if (recipe.length > 0) {
            resourceItem = getResource(recipe[0].name)
        } else {
            break
        }
    }

    return {
        itemsCrafted: amount,
        //@ts-expect-error Goofy TS
        moneyInvested: (getComponent(resource)?.market_price * itemsUsed).toFixed(2),
        itemsUsed,
        //@ts-expect-error Goofy TS
        revenue: (getResource(final_item?.toString() ?? "")?.market_price * amount).toFixed(2),
        //@ts-expect-error Goofy TS
        profit: (getResource(final_item?.toString() ?? "")?.market_price * amount - getComponent(resource)?.market_price * itemsUsed).toFixed(2)
    }
}