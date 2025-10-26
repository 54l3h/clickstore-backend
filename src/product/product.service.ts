import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from 'src/database/repositories';
import { CreateProductDto } from './dto/product.dto';
import { Types } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { UploadService } from 'src/common/services/upload.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly uploadService: UploadService,
  ) {}

  async createProduct(images, dto: CreateProductDto) {
    // Check if images are provided
    if (!images?.length) {
      throw new BadRequestException('No files uploaded');
    }

    // Get category
    const category = await this.categoryService.getCategoryById(
      new Types.ObjectId(dto.categoryId),
    );
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const uploadedImages: { secure_url: string; public_id: string }[] = [];
    for (const image of images) {
      const imageResult = await this.uploadService.uploadFile(image.path, {
        folder: `${process.env.CLOUDINARY_FOLDER}/category/${category.folderId}/product-${randomUUID()}`,
      });
      uploadedImages.push(imageResult);
    }

    // Create product with uploaded image URLs
    const product = await this.productRepository.create({
      images: uploadedImages,
      folderId: category.folderId,
      ...dto,
      createdBy: new Types.ObjectId(dto.userId),
      categoryId: new Types.ObjectId(dto.categoryId),
    });

    return product;
  }
}
