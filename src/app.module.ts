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
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventListenerService } from './eventlistener.service';

@Module({
  imports: [ProductModule, PrismaModule, CategoryModule, OrderModule, ProductorderModule, UserModule, AuthModule, EventEmitterModule.forRoot()],
  // controllers: [AppController],
  providers: [EventListenerService],
})
export class AppModule {}
