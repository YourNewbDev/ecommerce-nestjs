import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client"




export class SignResponse {

    @ApiProperty()
    accessToken: string

    @ApiProperty()
    refreshToken: string

    @ApiProperty()
    user: User;
}