import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Auth } from 'src/common/decorators';
import { RolesEnum } from 'src/common/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileOptions } from 'src/common/utils';
import { ImageAllowedExtensions } from 'src/common/constants';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @Auth(RolesEnum.ADMIN)
  @UseInterceptors(
    FileInterceptor(
      'image',
      UploadFileOptions({
        path: 'category',
        allowFileTypes: ImageAllowedExtensions,
      }),
    ),
  )
  async createCategory(
    @Req() req: Request,
    @Body() dto: CreateCategoryDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const userId = req['user'].id;
    return this.categoryService.createCategory(userId, dto, image);
  }

  @Put('update/:categoryId')
  @Auth(RolesEnum.ADMIN)
  @UseInterceptors(
    FileInterceptor(
      'image',
      UploadFileOptions({
        path: 'category',
        allowFileTypes: ImageAllowedExtensions,
      }),
    ),
  )
  async updateCategory(
    @Req() req: Request,
    @Body() dto,
    @Param('categoryId') categoryId: number,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const userId = req['user'].id;
    return this.categoryService.updateCategory(categoryId, userId, dto, image);
  }
}
