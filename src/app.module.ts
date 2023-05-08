import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.schema';
import { BookService } from './services/book.service';
import { BookController } from './controllers/book/book.controller';
import { OrderController } from './controllers/order/order.controller';
import { BookSchema } from './models/book.schema';
import { OrderSchema } from './models/order.schema';
import { OrderService } from './services/order.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/gart-bookstore-db'),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema},
      { name: 'Book', schema: BookSchema},
      { name: 'Order', schema: OrderSchema}
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret
    }),
  ],
  controllers: [AppController, UserController, BookController, OrderController],
  providers: [AppService, UserService, BookService, OrderService],
})
export class AppModule { }
