import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {
  CategoryRepository,
  ProductRepository,
} from 'src/database/repositories';
import { CategoryModel, ProductModel } from 'src/database/models';
import { CategoryService } from 'src/category/category.service';
import { UploadService } from 'src/common/services/upload.service';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    CategoryService,
    CategoryRepository,
    UploadService,
  ],
  imports: [ProductModel, CategoryModel],
})
export class ProductModule {}
