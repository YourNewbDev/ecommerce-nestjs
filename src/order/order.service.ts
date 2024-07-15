import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { error } from 'console';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) { }

  //ALL USER RETRIEVE ORDER
  async findAll() {
    try {
      return await this.prisma.order.findMany({
        include: {
          productOrder: {
            include: {
              product: true
            }
          },
          User: {
            include: {
              profile: true
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
      return await this.prisma.order.findUniqueOrThrow({
        where: {
          id: id
        },
        include: {
          productOrder: {
            include: {
              product: true
            }
          },
          User: {
            include: {
              profile: true
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

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  //ALL USER DELETE ORDER 
  async remove(id: string) {
    try {
      return await this.prisma.order.delete({
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
