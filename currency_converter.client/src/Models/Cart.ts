export interface Cart {
    id: string,
    items: Item[]
}

export interface Item{
    name: string,
    price: number,
    currency: string
}