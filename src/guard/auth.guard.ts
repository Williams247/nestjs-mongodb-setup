import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SessionProps } from '../utils/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException({
        message: 'Unauthorized',
        success: false,
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
    try {
      const payload: SessionProps = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      request['user'] = payload; // assigns payload to nest request
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({
        message: 'Unauthorized',
        success: false,
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
    return true; // Moves on to the next controller
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
