import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/database/repositories';
import { UserModel } from 'src/database/models';
import { TokenService } from 'src/common/services';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModel, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, TokenService],
})
export class AuthModule {}
