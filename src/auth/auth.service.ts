import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { SignupDto } from './dto/sign-up.dto';
import { UserRepository } from 'src/database/repositories';
import { Events, generateOTP } from 'src/common/utils';
import { comparePassword } from 'src/common/security';
import { TokenService } from 'src/common/services';
import { SigninDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async signup(dto: SignupDto) {
    try {
      const user = await this.userRepository.findByEmail(dto.email);

      if (user) {
        throw new BadRequestException('User already exists');
      }

      const OTP = generateOTP(6);
      Events.emit('sendEmail', {
        to: dto.email,
        subject: 'Welcome to Clickstore',
        text: `Hello ${dto.firstName}, welcome to Clickstore! We're glad to have you on board.
        Your OTP is: ${OTP}`,
      });

      return await this.userRepository.create(dto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async signin(dto: SigninDto) {
    try {
      const user = await this.userRepository.findByEmail(dto.email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!(await comparePassword(user.password, dto.password))) {
        throw new BadRequestException('Invalid credentials');
      }
      const payload = { id: user.id, userType: user.role };

      return { accessToken: this.tokenService.generateToken(payload) };
    } catch (error) {
      throw new InternalServerErrorException('Failed to login');
    }
  }

  async validateUser(id: string) {
    return this.userRepository.findOne({ filters: { _id: id } });
  }
}
