import { CreateIndividualProductDto } from '../dtos/individual-products/create-individual-product.dto';
import { IndividualProductsService } from '../services/individual-products.service';
import { container } from 'tsyringe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  Tags,
} from 'tsoa';
import { validate as isUuid } from 'uuid';
import { UpdateIndividualProductDto } from '../dtos/individual-products/update-individual-product.dto';

@Route('productos-individuales')
@Tags('Productos Individuales')
export class IndividualProductsController extends Controller {
  private individualProductsService: IndividualProductsService;

  constructor() {
    super();
    this.individualProductsService = container.resolve(
      IndividualProductsService
    );
  }

  @Post()
  createIndividualProduct(@Body() dto: CreateIndividualProductDto) {
    return this.individualProductsService.createIndividualProduct(dto);
  }

  @Get()
  getAllIndividualProducts() {
    return this.individualProductsService.getAllIndividualProducts();
  }

  @Get('{id}')
  getIndividualProductById(@Path() id: string) {
    if (!isUuid(id))
      throw { status: 400, message: `Parámetro "id" debe ser un UUID válido` };

    return this.individualProductsService.getIndividualProductById(id);
  }

  @Put('{id}')
  updateIndividualProductById(
    @Path() id: string,
    @Body() dto: UpdateIndividualProductDto
  ) {
    if (!isUuid(id))
      throw { status: 400, message: `Parámetro "id" debe ser un UUID válido` };

    return this.individualProductsService.updateIndividualProductById(id, dto);
  }

  @Delete('{id}')
  removeIndividualProductById(@Path() id: string) {
    if (!isUuid(id))
      throw { status: 400, message: `Parámetro "id" debe ser un UUID válido` };

    return this.individualProductsService.removeIndividualProductById(id);
  }
}
