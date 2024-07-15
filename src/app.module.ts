import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { ProductorderModule } from './productorder/productorder.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductModule, PrismaModule, CategoryModule, OrderModule, ProductorderModule, UserModule, AuthModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
