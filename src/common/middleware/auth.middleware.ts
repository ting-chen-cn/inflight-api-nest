import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const validTokens = process.env.STATIC_TOKENS?.split(',') || [];
      if (validTokens.includes(token)) {
        next();
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    } else {
      throw new UnauthorizedException(
        'Authorization header missing or invalid',
      );
    }
  }
}
