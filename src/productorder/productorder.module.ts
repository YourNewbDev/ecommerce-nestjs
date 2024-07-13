import { Module } from '@nestjs/common';
import { ProductorderService } from './productorder.service';
import { ProductorderController } from './productorder.controller';

@Module({
  controllers: [ProductorderController],
  providers: [ProductorderService],
})
export class ProductorderModule {}
