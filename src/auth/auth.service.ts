import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Req,
} from '@nestjs/common';
import JWT from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../schema/user.schema';
import { FetchService } from '../provider/fetch.service';
import { ServiceResponseType, DbSchema } from '../provider/types';
import { Role } from '../utils/types';
import { CreateUserType } from './auth-schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>, // Inject a model based on the schema type
    private fetchService: FetchService, // Inject a share or generic service
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

  async registerUser(payload: CreateUserType): Promise<ServiceResponseType> {
    try {
      const signUpResponse = await this.fetchService.fetchOne({
        modelName: DbSchema.USER,
        searchParams: { email: payload.email, role: payload.role },
      });

      // if (
      //   signUpResponse.data.role === Role.ADMIN &&
      //   signUpResponse.data.results.length > 1
      // ) {
      //   throw new HttpException('Admin already exist', HttpStatus.CONFLICT);
      // }

      // if (signUpResponse.status === HttpStatus.OK) {
      //   throw new HttpException('Email taken', HttpStatus.CONFLICT);
      // }

      const hashPassword = await bcrypt.hash(payload.password ?? '', 10);

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
