import { Controller, Post, Body, Patch, Req, Get, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, SigninDto, ConfirmEmailDto, LogoutDto } from './dto';
import type { Request } from 'express';
import { Auth, Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/types';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { SessionInfo } from 'src/database/models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @HttpCode(200)
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @Patch('confirm-email')
  @Auth()
  confirmEmail(@Req() req: Request, @Body() dto: ConfirmEmailDto) {
    const userId = req['user'].id; // string
    return this.authService.confirmEmail(userId, dto);
  }

  @Get('profile')
  @Auth()
  getProfile(@Req() req: Request) {
    const userId = req['user'].id; // string
    return this.authService.getProfile(userId);
  }

  @Post('logout')
  @Auth()
  logout(@Req() req: Request, dto: LogoutDto) {
    const { jti: tokenId, id: userId, exp } = req['user'];
    const sessionInfo: SessionInfo = {
      tokenId,
      userId,
      expiryDate: new Date(exp * 1000),
    };
    
    return this.authService.logout(sessionInfo);
  }
}
