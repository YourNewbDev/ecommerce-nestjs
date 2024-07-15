import { Role } from "@prisma/client";
import { Type } from "class-transformer";
import { IsHash, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    role!: Role
    email: string
    password: string
    address: string

    id: string
}

export class CreateProfileinUserDtO {

    @IsString()
    @IsNotEmpty()
    firstName: string
    lastName: string
}

export class CreateUserProfileDto {

    user: CreateUserDto

    profile: CreateProfileinUserDtO
}