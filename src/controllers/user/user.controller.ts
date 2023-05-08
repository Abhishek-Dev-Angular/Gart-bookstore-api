import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req } from '@nestjs/common';
//import { UserLoginDTO } from '../../models/user.dto';
import { UserService } from '../../services/user.service';
import { ILoginDTO, IRegisterDTO } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Req() request: Request, @Body() body: ILoginDTO): Promise<any> {
        return this.userService.login(body);
    }

    @Post('createUser')
    async create(@Body() body: IRegisterDTO) {
        return this.userService.createUser(body);
    }
}
