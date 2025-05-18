import { IsString } from 'class-validator';

export class CreateIndividualProductDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;
}
