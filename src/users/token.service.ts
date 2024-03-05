// token.service.ts
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  private readonly secretKey = 'b5fe0bd7e05c21ec17d62902681d5d29478ea33fe0ec904069d418cb355507d3'; // Replace with your actual secret key

  generateToken(payload: any): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '5d' }); // Token expires in 5 days
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (err) {
      return null;
    }
  }
}
