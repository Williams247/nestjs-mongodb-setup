import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserPayload } from '../types';
import { Role } from '../types'

@Controller('auth')
export class AuthController {
  constructor(private todoService: AuthService) {}
  @Post('/register')
  register(@Body() { firstName, lastName, email, password }: UserPayload) {
    return this.todoService.registerUser({
      firstName,
      lastName,
      email,
      password,
      role: Role.USER,
    });
  }
}
