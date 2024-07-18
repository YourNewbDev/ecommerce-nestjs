import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { error } from 'console';
import e from 'express';
import { CreateUserProfileDto } from 'src/user/dto/create-user.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService, private eventEmitter: EventEmitter2) { }

  //USER_ADMIN CREATE CATEGORY
  async create(payload: CreateCategoryDto) {
    try {
      const createdCategory = await this.prisma.category.create({
        data: payload
      })

      this.eventEmitter.emit('category.created', createdCategory)

      return createdCategory
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          console.log(`There is a unique constraint violation, a new category cannot be created with ${payload.name}`)
        }
      }
    }
    throw error
  }

  //USER_ADMIN & USER RETRIEVE 
  async findAll() {
    try {
      return await this.prisma.category.findMany({
        include: {
          product: true
        }
      })
    } catch (error) {
    }
    throw error
  }

  async findOne(id: string) {
    try {
      return await this.prisma.category.findUniqueOrThrow({
        where: {
          id: id
        },
        include: {
          product: true
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          console.log(`An operation failed because it depends on one or more records that were required but not found.`)
        }
      }
    }
    throw error
  }

  //USER_ADMIN UPDATE CATEGORY **ALL PRODUCTS UNDER THE CHANGED CATEGORY WILL GET AFFECTED**
  async update(id: string, payload: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: {
          id: id
        },
        data: payload
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          console.log(`An operation failed because it depends on one or more records that were required but not found.`)
        }
      }
    }
    throw error
  }

  //USER_ADMIN DELETE CATEGORY NOT WITH PRODUCT
  async remove(id: string) {
    try {
      return await this.prisma.category.delete({
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
}
