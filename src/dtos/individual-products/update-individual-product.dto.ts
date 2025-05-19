import { IsString } from 'class-validator';

export class UpdateIndividualProductDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;
}
