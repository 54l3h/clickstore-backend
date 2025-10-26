import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Auth } from 'src/common/decorators';
import { RolesEnum } from 'src/common/types';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFileOptions } from 'src/common/utils';
import { ImageAllowedExtensions } from 'src/common/constants';
import type { Request } from 'express';
import { CreateProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @Auth(RolesEnum.ADMIN)
  @UseInterceptors(
    FilesInterceptor(
      'images',
      3,
      UploadFileOptions({
        path: 'product',
        allowFileTypes: ImageAllowedExtensions,
      }),
    ),
  )
  async createProduct(
    @Req() req: Request,
    @UploadedFiles() images: Express.Multer.File[],
    @Body() dto: CreateProductDto,
  ) {
    dto.userId = req['user'].id;
    return await this.productService.createProduct(images, dto);
  }
}
