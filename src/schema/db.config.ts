import { MongooseModule } from '@nestjs/mongoose';
import { Todos, TodosSchema } from '../schema/todos.schema';
import { User, UserSchema } from '../schema/user.schema';
export class DataBaseConfig {
  constructor() {}

  static runConnection() {
    return MongooseModule.forRootAsync({
      useFactory: function () {
        const uri = process.env.MONGODB_URI;

        return {
          uri,
          connectionFactory: function (connection) {
            return connection as Record<string, any>;
          },
        };
      },
    });
  }

  static getSharedSchema() {
    return MongooseModule.forFeature([
      { name: Todos.name, schema: TodosSchema },
      { name: User.name, schema: UserSchema },
    ]);
  }
}
