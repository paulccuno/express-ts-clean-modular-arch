import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class SubProductDto {
  @IsUUID()
  id!: string;

  @IsNumber()
  @Min(0.01)
  @Max(100)
  contributionPercentage!: number;
}

export class CreateCompositeProductDto {
  @IsString()
  name!: string;

  @ValidateNested({ each: true })
  @Type(() => SubProductDto)
  subProducts!: SubProductDto[];
}
