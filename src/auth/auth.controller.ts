import {
  Controller,
  Post,
  Body,
  Patch,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, SigninDto, ConfirmEmailDto } from './dto';
import type { Request } from 'express';
import { Auth, Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/types';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @Patch('confirm-email')
  @Auth()
  confirmEmail(@Req() req: Request, @Body() dto: ConfirmEmailDto) {
    const userId = req['user'].id; // string
    return this.authService.confirmEmail(userId, dto);
  }
}
