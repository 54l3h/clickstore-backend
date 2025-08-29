import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { hash } from 'src/common/security';
import { RolesEnum } from 'src/common/types';

// create class schema
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, type: String, lowercase: true, trim: true })
  firstName: string;

  @Prop({ required: true, type: String, lowercase: true, trim: true })
  lastName: string;

  @Prop({
    required: true,
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;

  @Prop({ type: String, enum: RolesEnum, default: RolesEnum.NORMAL_USER })
  role: string;
}

// create actual schema
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password);
  }

  next();
});

// create model
export const UserModel = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);

// export type
export type UserType = HydratedDocument<User>;
