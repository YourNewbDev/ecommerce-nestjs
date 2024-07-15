export class CreateProductorderDto {
    productId: string
    price: number
    quantity: number
}

export class CreateOrder {
    userId: string
}

export class CreateOrderProductDto {
    order: CreateOrder

    productorder: CreateProductorderDto[] //MANY TO ONE ORDER
}