import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductorderService } from './productorder.service';
import { CreateOrderProductDto, CreateProductorderDto } from './dto/create-productorder.dto';
import { UpdateProductorderDto } from './dto/update-productorder.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('productorder')
export class ProductorderController {
  constructor(private readonly productorderService: ProductorderService) {}

  @Post()
  create(@Body() payload: CreateOrderProductDto) {
    return this.productorderService.create(payload)
  }

  // @Get()
  // async findAll() {
  //   return await this.prisma.productOrder.findMany({
  //     include: {
  //       Order: true,
  //       product: true
  //     }
  //   })
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.prisma.productOrder.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductorderDto: UpdateProductorderDto) {
  //   return this.productorderService.update(+id, updateProductorderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productorderService.remove(+id);
  // }
}
