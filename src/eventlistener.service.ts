import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Category, ProductOrder } from '@prisma/client';
import { Product } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class EventListenerService {
    constructor(private readonly prisma: PrismaService, private eventEmitter: EventEmitter2) { }

    @OnEvent('category.created')
    handleCategoryCreated(createdCategory: Category) {
        console.log(`Category ${createdCategory.name} created`);
        // Additional actions when a category is created
    }

    @OnEvent('product.created')
    handleProductCreated(createdProduct: Product, createdCategory: Category) {
        console.log(`Product ${createdProduct.name} created under category ${createdCategory.name}`);
        // Additional actions when a product is created under a specific category
    }

    @OnEvent('order.created')
    async handleUpdateInventory(createdOrder: { productOrder: ProductOrder[] }) {
        createdOrder.productOrder.map(async (item) => {
            await this.prisma.product.update({
                where: {
                    id: item.productId
                },
                data: {
                    quantity: {
                        decrement: item.quantity
                    }
                }
            })
        })
    }

    @OnEvent('order.cancelled')
    async handleCancelInventory(cancelledOrder: ProductOrder) {

        return await this.prisma.product.update({
            where: {
                id: cancelledOrder.productId
            },
            data: {
                quantity: {
                    increment: cancelledOrder.quantity
                }
            }
        })
    }
}
