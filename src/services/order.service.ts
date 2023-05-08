import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { IOrderDTO } from 'src/controllers/order/order.dto';
import { Order } from 'src/types/order';
import { APIMessage } from 'src/utils/utility-messages';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) { }

  async createOrder(orderObj: IOrderDTO): Promise<Order | undefined> {
    const order = new this.orderModel(orderObj);
    return order.save();
  }

  async getOrdersByUserId(userId: string): Promise<Order[] | undefined> {
    let ids: any = [userId];
    ids = ids.map(function(el) { return new mongoose.Types.ObjectId(el) })
    let orders = await this.orderModel.aggregate([
      {
          $match:{owner: { $in: ids}}
      },
      {
        $lookup: {
          from: 'books',
          localField: 'books.book',
          foreignField: '_id',
          as: 'booksArray'
        }
      }
    ]);
    return orders;
  }
}