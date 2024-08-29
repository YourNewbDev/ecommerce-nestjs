import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { SignInInput } from './dto/signin-input';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SignUpInput } from './dto/signup-input';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(signUpInput: SignUpInput, res: Response) {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          email: signUpInput.email,
        },
      });

      if (userExists) {
        throw new BadRequestException('Email already exists');
      }

      const hashedPassword = await argon.hash(signUpInput.password);

      const user = await this.prisma.user.create({
        data: {
          username: signUpInput.username,
          password: hashedPassword,
          email: signUpInput.email,
        },
      });

      const { accessToken, refreshToken } = await this.createTokens(
        user.id,
        user.email,
        user.username,
      );
      await this.updateRefresh(user.id, refreshToken);

      // return { accessToken, refreshToken, user }
      res.cookie('token', accessToken, {});

      return res.send({ message: 'Logged in successfully', token: accessToken });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credetials Taken');
        }
      }
      throw error;
    }
  }

  async adminSignin(signInInput: SignInInput, req: Request, res: Response) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: signInInput.email
          },
          {
            username: signInInput.username
          }
        ],
        AND: [
          {
            role: 'ADMIN'
          }
        ]
      }
    });

    if (!user) throw new ForbiddenException('Email or Username not registered or is not an admin');

    const pwMatches = await argon.verify(user.password, signInInput.password);

    if (!pwMatches) throw new ForbiddenException('Password incorrect');

    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
      user.username
    );
    await this.updateRefresh(user.id, refreshToken);

    if (!accessToken) {
      throw new ForbiddenException('Could not signin');
    }

    res.cookie('token', accessToken, {});
    console.log(user)
    return res.send({message: 'Logged in successfully', token: accessToken });

  }

  async userSignin(signInInput: SignInInput, req: Request, res: Response) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: signInInput.email
          },
          {
            username: signInInput.username
          }
        ]
      },
    });

    if (!user) throw new ForbiddenException('Email or Username not registered');

    const pwMatches = await argon.verify(user.password, signInInput.password);

    if (!pwMatches) throw new ForbiddenException('Password incorrect');

    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
      user.username,
    );
    await this.updateRefresh(user.id, refreshToken);

    if (!accessToken) {
      throw new ForbiddenException('Could not signin');
    }

    res.cookie('token', accessToken, {});
    console.log(user)
    return res.send({ message: 'Logged in successfully', token: accessToken });

    // return { accessToken, refreshToken, user }
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Logged out successfully' });
  }

  ///Helper function

  // async signToken(args: { userId: string; email: string }) {
  //   const payload = {
  //     id: args.userId,
  //     email: args.email,
  //   };

  //   const token = await this.jwt.signAsync(payload, {
  //     secret: this.config.get("JWT_SECRET"),
  //   });

  //   return token;
  // }

  async createTokens(userId: string, email: string, username: string) {
    const accessToken = await this.jwt.sign(
      {
        userId,
        email,
        username,
      },
      { expiresIn: '8h', secret: this.config.get('JWT_SECRET') },
    );

    const refreshToken = await this.jwt.sign(
      {
        userId,
        email,
        username,
        accessToken,
      },
      { expiresIn: '7d', secret: this.config.get('JWT_REFRESH_TOKEN') },
    );

    return { accessToken, refreshToken };
  }

  async updateRefresh(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
  }
  ///Helper function
}
