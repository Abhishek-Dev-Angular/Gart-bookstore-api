import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBookDTO, IBookFilterDTO } from 'src/controllers/book/book.dto';
import { Book } from 'src/types/book';
import { APIMessage } from 'src/utils/utility-messages';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private bookModel: Model<Book>) { }

  async createBook(bookObj: IBookDTO): Promise<Book | undefined> {
    const { title } = bookObj;
    const book = await this.bookModel.findOne({ title });
    if (book) {
      throw new HttpException(APIMessage.duplicateBook, HttpStatus.BAD_REQUEST);
    }
    const addedBook = new this.bookModel(bookObj);
    return addedBook.save();
  }

  async getAllBooks(body: IBookFilterDTO): Promise<Book[] | undefined> {
    switch (body.searchBy) {
      case 'title':
        const t = body.searchText;
        const regexTitle = new RegExp(t, 'i');
        return await this.bookModel.find({ title: { $regex: regexTitle } });
      case 'author':
        const a = body.searchText;
        const regexAuthor = new RegExp(a, 'i');
        return await this.bookModel.find({ author: { $regex: regexAuthor } });
      case 'price':
        return await this.bookModel.find({ price: { $lt: body.searchText } });
      case 'rating':
        return await this.bookModel.find({ rating: { $lt: body.searchText } });
      case '':
        return await this.bookModel.find();
    }

  }
}