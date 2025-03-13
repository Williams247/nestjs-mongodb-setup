import { MongooseModule } from '@nestjs/mongoose';
import { Todos, TodosSchema } from './todos.schema';
import { User, UserSchema } from './user.schema';

export class DatabaseConfig {
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
    // Todos.name -> returns the class name, TodosSchema -> return the actual mongo schema (name + schema)
    return MongooseModule.forFeature([
      { name: Todos.name, schema: TodosSchema },
      { name: User.name, schema: UserSchema },
    ]);
  }
}
