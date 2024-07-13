import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { error } from 'console';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }

  async create(payload: CreateProductDto) {
    console.log(payload)
    try {
      return await this.prisma.product.create({
        data: payload
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

  async findAll() {
    try {
      return await this.prisma.product.findMany({
        include: {
          Category: true
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

  async update(id: string, payload: UpdateProductDto) {
    try {
      return await this.prisma.product.update({
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
      return await this.prisma.product.delete({
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
