import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCategoryDto, CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductCategoryDto) {}
