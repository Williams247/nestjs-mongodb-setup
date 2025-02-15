import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

function connectMongoose() {
  return MongooseModule.forRootAsync({
    useFactory: function () {
      const uri = 'mongodb://localhost:27017/todos';
      
      mongoose.connection.once('open', function () {
        console.log('MongoDB connection established successfully!');
      });

      mongoose.connection.on('error', function (error) {
        console.error('MongoDB connection error:', error);
      });

      return { uri };
    },
  });
}

export const runConnection = connectMongoose();
