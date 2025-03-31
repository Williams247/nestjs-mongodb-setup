import { HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user.schema';
import { FetchService } from '../../provider/fetch.service';
import { ServiceResponseType, DbSchema } from '../../provider/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private fetchService: FetchService,
  ) {}

  async fetchUser(id: string): Promise<ServiceResponseType> {
    try {
      return await this.fetchService.fetchOne({
        modelName: DbSchema.USER,
        searchParams: { _id: id },
      });
    } catch (error) {
      console.log(error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'An error occured',
      };
    }
  }
}
