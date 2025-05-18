import { Type } from 'class-transformer';
import { IsString, IsUUID, ValidateNested } from 'class-validator';

export class CompositeProductsDtoIndividualProducts {
  @IsUUID()
  id!: string;
}

export class CreateCompositeProductDto {
  @IsString()
  name!: string;

  @ValidateNested({ each: true })
  @Type(() => CompositeProductsDtoIndividualProducts)
  individualProducts!: CompositeProductsDtoIndividualProducts[];
}
