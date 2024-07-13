import { Injectable } from '@nestjs/common';
import { CreateProfileinUserDtO, CreateUserDto, CreateUserProfileDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(payload: CreateUserProfileDto) {
    return await this.prisma.user.create({
      data: {
        ...payload.user,
        profile: {
          create: {
            ...payload.profile
          }
        }
      }
    })
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
