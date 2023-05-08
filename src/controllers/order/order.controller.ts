import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { OrderService } from 'src/services/order.service';
import { IOrderDTO } from './order.dto';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {

    constructor(private readonly orderService: OrderService) {}

    @Get('getAll/:userId')
    async getOrdersByUserId(@Param('userId') userId: string) {
        return this.orderService.getOrdersByUserId(userId);
    }

    @Post('placeOrder')
    async create(@Body() body: IOrderDTO) {
        return this.orderService.createOrder(body);
    }
}
