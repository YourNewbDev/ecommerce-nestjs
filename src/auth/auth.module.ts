import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accesstoken.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, AccessTokenStrategy],
})
export class AuthModule {}
