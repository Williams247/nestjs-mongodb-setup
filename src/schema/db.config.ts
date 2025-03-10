import { MongooseModule } from '@nestjs/mongoose';
import { Todos, TodosSchema } from './todos.schema';
import { User, UserSchema } from './user.schema';

export class DatabaseConfig {
  static runConnection() {
    return MongooseModule.forRootAsync({
      useFactory: async function () {
        const uri = 'mongodb://localhost:27017/todos';

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

  static getRegisteredSchema() {
    // Todos.name -> returns the class name, TodosSchema -> return the actual mongo schema (name + schema)
    return MongooseModule.forFeature([
      { name: Todos.name, schema: TodosSchema },
      { name: User.name, schema: UserSchema },
    ]);
  }
}
