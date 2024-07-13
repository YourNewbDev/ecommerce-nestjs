import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  create(payload: CreateOrderDto) {
    return this.prisma.$transaction(async (tx) => {
      // CREATE ORDER
      const createOrder = await tx.order.create({
        data: payload
      })

      const getProduct = await tx.product.findUnique

    })
  }

  async findAll() {
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
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}