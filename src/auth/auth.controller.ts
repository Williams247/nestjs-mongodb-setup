import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserSchema, CreateUserType } from './auth-schema';
import { ZodValidationPipe } from '../utils/zod-validate-pipe';
@Controller('auth')
export class AuthController {
  constructor(private todoService: AuthService) {}
  @Post('/register')
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  register(
    @Body() { first_name, last_name, email, password, role }: CreateUserType,
  ) {
    return this.todoService.registerUser({
      first_name,
      last_name,
      email,
      password,
      role: role,
      verified: false
    });
  }
}
