import { IsNegative, IsNotEmpty, IsNotEmptyObject, IsNumber, IsPositive, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    description: string

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price: number

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    quantity: number

    imgUrl: string

    @IsString()
    @IsNotEmpty()
    categoryId: string
}
