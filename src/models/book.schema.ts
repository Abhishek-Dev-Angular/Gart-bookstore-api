import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number ,
    rating: Number,
    image: String,
    created: {
        type: Date,
        default: Date.now()
    }
});

// owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },