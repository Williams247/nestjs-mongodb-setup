import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Req,
} from '@nestjs/common';
import JWT from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../schema/user.schema';
import { FetchService } from '../provider/fetch.service';
import { ServiceResponseType, DbSchema } from '../provider/types';
import { UserPayload } from '../types';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private fetchService: FetchService,
  ) {}

  async loginUser(
    @Req() request,
    @Body() payload: { email: string; password: string },
  ): Promise<ServiceResponseType> {
    try {
      const loginResponse = await this.fetchService.fetchOne({
        modelName: DbSchema.USER,
        searchParams: { email: payload.email },
      });

      if (!loginResponse.status) {
        throw new HttpException(
          'Wrong email or password',
          HttpStatus.NOT_FOUND,
        );
      }

      const userPassword = await bcrypt.compare(
        payload.password,
        loginResponse.data.password,
      );

      if (!userPassword) {
        throw new HttpException(
          'Wrong email or password',
          HttpStatus.NOT_FOUND,
        );
      }

      const loginData = {
        id: loginResponse.data._id,
      };

      const signedToken = await JWT.sign(loginData, 'APP_SECRET', {
        expiresIn: 3600,
      });

      return {
        ...loginResponse,
        data: { token: signedToken },
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'An error occured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async registerUser(payload: UserPayload): Promise<ServiceResponseType> {
    try {
      const signUpResponse = await this.fetchService.fetchOne({
        modelName: DbSchema.USER,
        searchParams: { email: payload.email },
      });

      if (signUpResponse.status) {
        throw new HttpException('Email taken', HttpStatus.CONFLICT);
      }

      if (signUpResponse.data.role === payload.role) {
        throw new HttpException('An admin exists', HttpStatus.CONFLICT);
      }

      const hashPassword = await bcrypt.hash(payload.password as string, 10);
      const signupUser = new this.userModel({
        ...payload,
        password: hashPassword,
      });

      await signupUser.save();

      return {
        status: HttpStatus.CREATED,
        success: true,
        message: 'User Created',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'An error occured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
