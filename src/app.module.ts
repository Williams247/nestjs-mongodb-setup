import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { DatabaseConfig } from './schema/db.config';
import { AuthPass } from './middleware/auth.middleware';
import { TodosController } from './todos/todos.controller';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';
import { Role } from './types';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseConfig.runConnection(),
    AdminModule,
    TodosModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthPass({ userType: Role.ADMIN, forAllUsers: false }))
      .forRoutes(AdminController);
    consumer
      .apply(AuthPass({ userType: Role.USER, forAllUsers: true }))
      .forRoutes(TodosController);
  }
}
