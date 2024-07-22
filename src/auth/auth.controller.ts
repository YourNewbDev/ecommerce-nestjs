import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/signup-input';

import { SignInInput } from './dto/signin-input';
import { SignResponse } from './dto/sign-response';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Auth } from './entities/auth.entity';
import { Public } from 'src/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @ApiCreatedResponse({ type: Auth })
  signUp(@Body() signUpInput: SignUpInput, @Response() res) {
    return this.authService.signup(signUpInput, res);
  }

  @Public()
  @Post('signin')
  @ApiCreatedResponse({ type: Auth })
  signin(@Body() signInInput: SignInInput, @Request() req, @Response() res) {
    return this.authService.signin(signInInput, req, res);
  }

  @Get('signout')
  @Public()
  signout(@Request() req, @Response() res) {
    return this.authService.signout(req, res);
  }
}
