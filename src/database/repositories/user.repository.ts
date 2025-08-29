import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { User, UserType } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends DatabaseService<UserType> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserType>,
  ) {
    super(userModel);
  }

  async findByEmail(email: string) {
    return this.findOne({ filters: { email } });
  }
}
