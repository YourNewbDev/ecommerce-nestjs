import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto, CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { error } from 'console';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }

  //USER_ADMIN CREATE PRODUCT WITH CATEGORY
  async create(payload: CreateProductCategoryDto) {
    console.log(payload)
    try {
      return await this.prisma.product.create({
        data: {
          ...payload.product,
          Category: {
            connect: {
              name: payload.category.name
            }
          }
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          console.log(`Foreign key constraint failed on the field: categoryId`)
        }
      }
    }
    throw error
  }

  //USER_ADMIN & USER RETRIEVE 
  async findAll() {
    try {
      return await this.prisma.product.findMany({
        include: {
          Category: {
            select: {
              name: true
            }
          }
        }
      })
    } catch (error) {

    }
    throw error
  }

  async findOne(id: string) {
    try {
      return await this.prisma.product.findUniqueOrThrow({
        where: {
          id: id
        },
        include: {
          Category: {
            select: {
              name: true
            }
          }
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

  //USER_ADMIN UPDATE PRODUCT WITH CATEGORY 
  async update(id: string, payload: UpdateProductDto) {
    try {
      return await this.prisma.product.update({
        where: {
          id: id
        },
        data: {
          ...payload.product,
          Category: {
            connect: {
              name: payload.category.name
            }
          }
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

  //USER_ADMIN DELETE PRODUCT NOT WITH CATEGORY
  async remove(id: string) {
    try {
      return await this.prisma.product.delete({
        where: {
          id: id
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
}
