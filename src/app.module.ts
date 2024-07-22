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
import { APP_GUARD } from '@nestjs/core';
import { AccesTokenGuard } from './auth/guards/accessToken.guard';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    PrismaModule,
    OrderModule,
    ProductorderModule,
    UserModule,
    AuthModule,
    EventEmitterModule.forRoot(),
  ],
  // controllers: [AppController],
  providers: [
    EventListenerService,
    { provide: APP_GUARD, useClass: AccesTokenGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
