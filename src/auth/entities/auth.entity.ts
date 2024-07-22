import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class Auth {
    @ApiProperty()
    accessToken: string

    // @ApiProperty()
    // refreshToken: string

    @ApiProperty()
    user: User;
}