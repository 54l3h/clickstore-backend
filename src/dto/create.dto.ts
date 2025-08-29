import {
  IsString,
  ValidateIf,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'confirmPasswordConstraint', async: false })
export class ConfirmPasswordConstraint implements ValidatorConstraintInterface {
  validate(
    cPassword: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    // if (cPassword !== validationArguments.password) {
    //   return false;
    // }

    console.log({ cPassword, arguments });

    return true;
  }
}

export class CreateDto {
  @IsString()
  firstName: string;

  @IsString()
  password: string;

  @IsString()
  @ValidateIf((args) => args.password)
  cPassword: string;
}
