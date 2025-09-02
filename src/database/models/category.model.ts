import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { User } from './user.model';
import slugify from 'slugify';

// Class Schema
@Schema({})
export class Category {
  @Prop({
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: { name: 'category_name_unique_idx', unique: true },
  })
  name: string;

  @Prop({
    type: String,
    default: function () {
      return slugify(this.name, '-');
    },
    index: { name: 'category_slug_idx' },
  })
  slug: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  createdBy: Types.ObjectId | string;

  @Prop({ type: Object })
  image: object;
}

// Actual Schema

const CategorySchema = SchemaFactory.createForClass(Category);

// Model

const CategoryModel = MongooseModule.forFeature([
  { name: Category.name, schema: CategorySchema },
]);

// Type

export type CategoryType = HydratedDocument<Category> & Document;
