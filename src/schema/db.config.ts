import { MongooseModule } from '@nestjs/mongoose';
import { Todos, TodosSchema } from '../schema/todos.schema';
import { User, UserSchema } from '../schema/user.schema';
export class DataBaseConfig {
  constructor() {}

  static runConnection() {
    return MongooseModule.forRootAsync({
      useFactory: async function () {
        const uri = process.env.MONGODB_URI;

        return {
          uri,
          connectionFactory: function (connection) {
            connection.once('open', function () {
              console.log('✅ MongoDB connection established successfully!');
            });

            connection.on('error', function (error) {
              console.error('❌ MongoDB connection error:', error);
            });

            return connection;
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
