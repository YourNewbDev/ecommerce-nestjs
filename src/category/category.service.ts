import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { error } from 'console';
import e from 'express';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) { }

  async create(payload: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({
        data: payload
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          console.log(`There is a unique constraint violation, a new category cannot be created with ${payload.name}`)
        }
      }
    }
    throw error
  }

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
          console.log(`An operation failed because it depends on one or more records that were required but not found. ID ${id}`)
        }
      }
    }
    throw error
  }

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
          console.log(`An operation failed because it depends on one or more records that were required but not found. ID ${id}`)
        }
      }
    }
    throw error
  }

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
