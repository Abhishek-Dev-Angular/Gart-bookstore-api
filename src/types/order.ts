import { Document } from 'mongoose';
import { User } from './user';
import { Book } from './book';

interface BookOrder {
    book: Book;
    quantity: number;
}

export interface Order extends Document {
    owner: User,
    totalPrice: number,
    books: BookOrder[],
    created: Date
}