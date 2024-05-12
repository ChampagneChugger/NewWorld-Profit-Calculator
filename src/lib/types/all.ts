export type resource = {
    name: string,
    slug: string,
    image: string,
    market_price: number,
    chance_for_extra: number,
    show: boolean,
    prismatic: boolean,
    isResource: boolean
}

export type component = {
    name: string,
    slug: string,
    image: string,
    market_price: number,
}

export type recipeItem = {
    name: string,
    recipe: recipe[]
}

export type recipe = {
    name: string,
    amount: number,
    isResource: boolean
}

export type result = {
    itemsCrafted: number,
    moneyInvested: number,
    itemsUsed: number,
    revenue: number,
    profit: number
}

export type prismaticResult = {
    totalCost: number,
    craftingItemToRecieve: number,
    totalRevenue: number,
    profitBeforeTax: number,
    extraMaterials?: material[]
}

type material = {
    name: string,
    amount: number,
    extra_profit_per_one: number
}

export type componentORresource = component & resource