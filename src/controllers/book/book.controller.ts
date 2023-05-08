import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { IBookDTO, IBookFilterDTO } from './book.dto';
import { BookService } from 'src/services/book.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('book')
export class BookController {

    constructor(private readonly bookService: BookService) {}

    @Post('getAll')
    async getAllBooks(@Body() body: IBookFilterDTO) {
        return this.bookService.getAllBooks(body);
    }

    @Post('createBook')
    async create(@Body() body: IBookDTO) {
        return this.bookService.createBook(body);
    }
}
