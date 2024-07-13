import { Role } from "@prisma/client";

export class CreateUserDto {
    role!: Role
    email: string
    password: string
    address: string
}

export class CreateProfileinUserDtO {
    firstName: string
    lastName: string
}

export class CreateUserProfileDto {
    user: CreateUserDto

    profile: CreateProfileinUserDtO
}