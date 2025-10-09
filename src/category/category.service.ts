import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UploadService } from 'src/common/services/upload.service';
import { CategoryRepository } from 'src/database/repositories';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly uploadService: UploadService,
  ) {}

  async createCategory(userId, dto, image?) {
    const checkCategoryName = await this.categoryRepository.findOne({
      filters: { name: dto.categoryName },
    });

    if (checkCategoryName) {
      throw new BadRequestException('Category already exists');
    }

    const category = {
      name: dto.categoryName,
      createdBy: new Types.ObjectId(userId),
    };

    if (image) {
      const imageResult = await this.uploadService.uploadFile(image.path, {
        folder: `${process.env.CLOUDINARY_FOLDER}/category/${dto.categoryName}`,
      });
      category['image'] = imageResult;
    }

    return await this.categoryRepository.create(category);
  }

  async updateCategory(categoryId, userId, dto, image?) {
    const category = await this.categoryRepository.findOne({
      filters: { _id: categoryId },
    });

    if (!category) {
      throw new BadRequestException('Invalid category name');
    }

    if (!category.createdBy.equals(userId)) {
      throw new UnauthorizedException(
        'Only the category creator can update this category',
      );
    }

    if (image) {
      await this.uploadService.deleteFileByPublicId(category.image.public_id);
      const categoryImage = await this.uploadService.uploadFile(image.path, {
        folder: `${process.env.CLOUDINARY_FOLDER}/category/${dto.categoryName}`,
      });
      category.image = categoryImage;
    }

    if (dto.categoryName) {
      category.name = dto.categoryName;
    }

    await category.save();
    return category;
  }
}
