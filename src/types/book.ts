import { Document } from 'mongoose';
import { User } from './user';

export interface Book extends Document {
    title: String,
    author: String,
    price: Number ,
    rating: Number,
    image: String,
    created: Date
}