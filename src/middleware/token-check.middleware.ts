import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class TokenCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-api-token']; // Заголовок или параметр, который вы будете использовать для проверки
    const expectedToken = process.env.SECRET_TOKEN; // Ожидаемое значение токена

    if (token !== expectedToken) {
      return res.status(401).json({ message: 'Token is not valid!!!' });
    }

    next();
  }
}
