import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../services';
import { UserRepository } from 'src/database/repositories';
import { Types } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const { authorization } = request.headers;
      if (!authorization) {
        throw new UnauthorizedException('Missing authorization header');
      }

      const [bearer, token] = authorization.split(' ') || [];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Invalid token format');
      }

      const { id, userType } = this.tokenService.verifyToken(
        token,
        process.env.JWT_ACCESS_SECRET!,
      );

      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (user.role !== userType) {
        throw new UnauthorizedException('Invalid token');
      }

      request['user'] = { id, userType };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
