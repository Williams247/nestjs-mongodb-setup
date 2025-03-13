import { Response } from 'express';
import { Res, Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserSchema,
  CreateUserType,
  LoginSchema,
  LoginType,
} from './auth-schema';
import { ZodValidationPipe } from '../utils/zod-validate-pipe';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async register(@Res() res: Response, @Body() payload: CreateUserType) {
    const result = await this.authService.registerUser(payload);
    return res.status(result.statusCode).json(result);
  }

  @Post('/login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Res() res: Response, @Body() payload: LoginType) {
    const result = await this.authService.loginUser(payload);
    return res.status(result.statusCode).json(result);
  }
}
