import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  // You should convert it to a number because you receive it from the form data
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  @IsNotEmpty()
  basePrice: number;

  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  @IsNotEmpty()
  @Max(1)
  @Min(0)
  @IsOptional()
  discount: number;

  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string;
}
