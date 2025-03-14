import { HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schema/user.schema';
import { FetchService } from '../provider/fetch.service';
import { ServiceResponseType, DbSchema } from '../provider/types';
import { Role } from '../utils/types';
import { CreateUserType } from './auth.validation';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private fetchService: FetchService,
    private jwtService: JwtService,
  ) {}

  async registerUser(payload: CreateUserType): Promise<ServiceResponseType> {
    try {
      if (payload.role === Role.ADMIN) {
        // fetch to search ROLE because it is generic
        const doesAdminExist = await this.fetchService.fetch({
          modelName: DbSchema.USER,
          searchParams: { role: payload.role },
        });

        if (
          doesAdminExist.data &&
          doesAdminExist.data.totalItems &&
          doesAdminExist.data.totalItems > 0
        ) {
          return {
            statusCode: HttpStatus.CONFLICT,
            success: false,
            message: 'An admin already exist',
          };
        }
      }

      // fetchOne to search becuase email is unique
      const signUpResponse = await this.fetchService.fetchOne({
        modelName: DbSchema.USER,
        searchParams: { email: payload.email },
      });

      if (signUpResponse.statusCode === HttpStatus.OK) {
        return {
          statusCode: HttpStatus.CONFLICT,
          success: false,
          message: 'Email taken',
        };
      }

      const hashPassword = await bcrypt.hash(payload.password ?? '', 10);

      const signupUser = new this.userModel({
        ...payload,
        password: hashPassword,
      });

      await signupUser.save();

      return {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: 'User Created',
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: true,
        message: 'An error occured',
      };
    }
  }

  async loginUser(payload): Promise<ServiceResponseType> {
    try {
      const loginResponse = await this.fetchService.fetchOne({
        modelName: DbSchema.USER,
        selectParms: 'password',
        searchParams: { email: payload.email },
      });

      if (!loginResponse.statusCode) {
        return {
          statusCode: HttpStatus.CREATED,
          success: true,
          message: 'Wrong email or password',
        };
      }

      const userPassword = await bcrypt.compare(
        payload.password,
        loginResponse.data.password,
      );

      if (!userPassword) {
        return {
          statusCode: HttpStatus.CREATED,
          success: true,
          message: 'Wrong email or password',
        };
      }

      const loginData = {
        id: loginResponse.data._id,
      };

      const signedToken = await this.jwtService.signAsync(loginData);

      return {
        ...loginResponse,
        data: { token: signedToken },
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: true,
        message: 'An error occured',
      };
    }
  }
}
