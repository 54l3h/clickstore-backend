import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OtpRepository, RevokedTokensRepository, UserRepository } from 'src/database/repositories';
import { OtpModel, RevokedTokenModel, UserModel } from 'src/database/models';
import { TokenService } from 'src/common/services';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from 'src/common/utils';

@Module({
  imports: [UserModel, OtpModel, RevokedTokenModel],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    TokenService,
    JwtService,
    OtpRepository,
    OtpService,
    RevokedTokensRepository
  ],
})
export class AuthModule {}
