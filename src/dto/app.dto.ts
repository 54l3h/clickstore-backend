import {
  IsString,
  Validate,
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
    const password = validationArguments?.object['password'];

    return password === cPassword;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Passwords do not match';
  }
}

export class AppDto {
  @IsString()
  firstName: string;

  @IsString()
  password: string;

  @IsString()
  @ValidateIf((args) => args.password)
  @Validate(ConfirmPasswordConstraint)
  cPassword: string;
}
