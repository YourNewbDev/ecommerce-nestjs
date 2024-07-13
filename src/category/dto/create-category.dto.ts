import { IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string
}
