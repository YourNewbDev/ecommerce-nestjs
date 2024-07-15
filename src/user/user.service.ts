import { Injectable, Post } from '@nestjs/common';
import { CreateProfileinUserDtO, CreateUserDto, CreateUserProfileDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { error } from 'console';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  //USER_ADMIN CREATE
  async createAdmin(payload: CreateUserProfileDto) {
    try {
      const saltOrRounds = 10
      const salt = await bcrypt.genSalt(saltOrRounds)
      const password = payload.user.password
      const hash = await bcrypt.hash(password, salt)
      return await this.prisma.user.create({
        data: {
          role: 'ADMIN',
          email: payload.user.email,
          password: hash,
          address: payload.user.address,
          profile: {
            create: {
              ...payload.profile
            }
          }
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          console.log(`Unique constraint failed on the ${payload.user.email}`)
        }
      }
    }
    throw error
  }

  //USER CREATE
  async createUser(payload: CreateUserProfileDto) {
    try {
      const saltOrRounds = 10
      const salt = await bcrypt.genSalt(saltOrRounds)
      const password = payload.user.password
      const hash = await bcrypt.hash(password, salt)
      return await this.prisma.user.create({
        data: {
          role: 'USER',
          email: payload.user.email,
          password: hash,
          address: payload.user.address,
          profile: {
            create: {
              ...payload.profile
            }
          }
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          console.log(`Unique constraint failed on the ${payload.user.email}`)
        }
      }
    }
    throw error
  }
  //USER_ADMIN RETRIEVE ALL USERS
  async findAll() {
    try {
      return await this.prisma.user.findMany({
        include: {
          profile: {
            select: {
              id: true,
              firstName: true,
              lastName: true
            }
          }
        }
      })
    } catch (error) {
    }
    throw error
  }

  //USER_ADMIN & USER RETRIEVE 
  async findOne(id: string) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: {
          id: id
        },
        include: {
          profile: {
            select: {
              id: true,
              firstName: true,
              lastName: true
            }
          }
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          console.log(`An operation failed because it depends on one or more records that were required but not found. ID ${id}`)
        }
      }
    }
    throw error
  }

  //USER_ADMIN & USER UPDATE WITH PROFILE
  async update(id: string, payload: UpdateUserDto) {
    try {
      const checkRole = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: id
        }
      })

      if (checkRole.role === 'ADMIN') {
        payload.user.role = 'ADMIN'
      }
      else {
        payload.user.role = 'USER'
      }

      const saltOrRounds = 10
      const salt = await bcrypt.genSalt(saltOrRounds)
      const password = payload.user.password
      const hash = await bcrypt.hash(password, salt)
      return await this.prisma.user.update({
        data: {
          email: payload.user.email,
          password: hash,
          address: payload.user.address,
          profile: {
            update: {
              data: {
                ...payload.profile
              }
            }
          }
        },
        where: {
          id: id
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          console.log(`An operation failed because it depends on one or more records that were required but not found. ID ${id}`)
        }
      }
    }
    throw error
  }

  //USER_ADMIN DELETE USER WITH PROFILE
  async remove(id: string) {
    try {
      return await this.prisma.$transaction([
        this.prisma.profile.delete({
          where: {
            userId: id
          }
        }),
        this.prisma.user.delete({
          where: {
            id: id
          }
        })
      ])
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          console.log(`An operation failed because it depends on one or more records that were required but not found. ID ${id}`)
        }
      }
    }
    throw error
  }
}
