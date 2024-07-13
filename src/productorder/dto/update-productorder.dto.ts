import { PartialType } from '@nestjs/mapped-types';
import { CreateProductorderDto } from './create-productorder.dto';

export class UpdateProductorderDto extends PartialType(CreateProductorderDto) {}
