import { Injectable } from '@nestjs/common';
import { CreateOrderProductDto, CreateProductorderDto } from './dto/create-productorder.dto';
import { UpdateProductorderDto } from './dto/update-productorder.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductorderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateOrderProductDto) {
    return await this.prisma.order.create({
      data: {
        ...payload.order,
        productOrder: {
          createMany: {
            data: payload.productorder
          }
        }
      }

    })
  }

  findAll() {
    return `This action returns all productorder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productorder`;
  }

  update(id: number, updateProductorderDto: UpdateProductorderDto) {
    return `This action updates a #${id} productorder`;
  }

  remove(id: number) {
    return `This action removes a #${id} productorder`;
  }
}
