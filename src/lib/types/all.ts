export type resource = {
    name: string,
    slug: string,
    image: string,
    market_price: number,
    chance_for_extra: number
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
    amount: number
}

export type result = {
    amountOfCoins: number,
    costOfCoins: number,
    charcoalAmount: number,
    charcoalRevenue: number,
    earnings: number
}