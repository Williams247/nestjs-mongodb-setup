import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from '../utils/types';

export interface Props {
  userType?: Role;
  forAllUsers?: boolean;
}

// Functional middleware for authentication
export function AuthPass({ userType, forAllUsers }: Props) {
  return function (
    request: Request | any,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const configService = new ConfigService(); // Get config service instance
      let token = request.headers.authorization;

      if (!token || !token.startsWith('Bearer ')) {
        throw new UnauthorizedException('Unauthorized');
      }

      token = token.slice(7, token.length);
      let decodedToken;

      try {
        decodedToken = JWT.verify(
          token,
          configService.get<string>('APP_SECRET'),
        );
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      if (!decodedToken || typeof decodedToken !== 'object') {
        throw new UnauthorizedException('Unauthorized');
      }

      if (forAllUsers) {
        request.user = decodedToken;
        return next();
      }

      if (!decodedToken.role || decodedToken.role !== userType) {
        throw new UnauthorizedException('Unauthorized');
      }

      request.user = decodedToken;
      next();
    } catch (error) {
      console.log('Error log =>', error);
      throw new UnauthorizedException('Unauthorized');
    }
  };
}
