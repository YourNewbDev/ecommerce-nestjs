import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";



export class SignInInput {

  // @IsNotEmpty()
  // @IsString()
  // @IsEmail()
  @ApiProperty()
  email: string;

  // @IsNotEmpty()
  // @IsString()
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  role: string;

}