import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../types/user';
import { Model } from 'mongoose';
import { ILoginDTO, IRegisterDTO } from 'src/controllers/user/user.dto';
import { APIMessage } from 'src/utils/utility-messages';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>, private jwtService: JwtService) { }

  private sanitizeUser(user: User){
    return user.depopulate('password');
  }

  async createUser(userObj: IRegisterDTO): Promise<User | undefined> {
    const { userEmail, password } = userObj;
    const user = await this.userModel.findOne({userEmail});
    if(user){
      throw new HttpException(APIMessage.duplicateUser, HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(userObj);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async login(body: ILoginDTO): Promise<any> {
    const { userEmail, password } = body;
    const user = await this.userModel.findOne({ userEmail });
    if (!user) {
      throw new HttpException(APIMessage.loginFailed, HttpStatus.UNAUTHORIZED);
    }

    if(await bcrypt.compare(password, user.password)){
      const payload = { email: user['userEmail'], id: user['_id'] };
      return {
        access_token: await this.jwtService.signAsync(payload)
      }
    }else {
      throw new HttpException(APIMessage.loginFailed, HttpStatus.UNAUTHORIZED);
    }
  }
}