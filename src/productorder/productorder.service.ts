import { Injectable } from '@nestjs/common';
import { CreateOrderProductDto, CreateProductorderDto } from './dto/create-productorder.dto';
import { UpdateProductorderDto } from './dto/update-productorder.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ProductorderService {
  constructor(private readonly prisma: PrismaService, private eventEmitter: EventEmitter2) { }

  //ALL USER CREATE ORDER WITH PRODUCTS
  create(payload: CreateOrderProductDto) {
    try {
      return this.prisma.$transaction(async (tx) => {
        const createdOrder = await tx.order.create({
          data: {
            ...payload.order,
            productOrder: {
              createMany: {
                data: payload.productorder
              }
            }
          },
          include: {
            productOrder: true
          }
        })

        this.eventEmitter.emit('order.created', createdOrder)

        return createdOrder
      })
    } catch (error) {
      console.log(error)
    }
  }

  async cancelOrder(id: string, payload: UpdateProductorderDto) {
    try {
      const cancelledOrder = await this.prisma.productOrder.update({
        where: {
          id: id
        },
        data: {
          status: 'CANCELLED'
        },
        include: {
          product: true
        }
      })
      console.log(cancelledOrder)
      this.eventEmitter.emit('order.cancelled', cancelledOrder)

      return cancelledOrder
    } catch (error) {
      console.log(error)
    }
  }

  findAll() {
    return `This action returns all productorder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productorder`;
  }

  // update(id: number, updateProductorderDto: UpdateProductorderDto) {
  //   return `This action updates a #${id} productorder`;
  // }

  remove(id: number) {
    return `This action removes a #${id} productorder`;
  }
}
