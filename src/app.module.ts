import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { runConnection } from './schema/config';

@Module({
  imports: [runConnection, TodosModule],
})
export class AppModule {}
