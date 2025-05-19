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
import { CompositeProductsService } from '../services/composite-products.service';
import { container } from 'tsyringe';
import { validate as isUuid } from 'uuid';
import { CreateCompositeProductDto } from '../dtos/composite-products/create-composite-product.dto';

@Route('productos-compuestos')
@Tags('Productos Compuestos')
export class CompositeProductsController extends Controller {
  private compositeProductsService: CompositeProductsService;

  constructor() {
    super();
    this.compositeProductsService = container.resolve(CompositeProductsService);
  }

  @Post()
  createCompositeProduct(@Body() dto: CreateCompositeProductDto) {
    return this.compositeProductsService.createCompositeProduct(dto);
  }

  @Get()
  getAllCompositeProducts() {
    return this.compositeProductsService.getAllCompositeProducts();
  }

  @Get('{id}')
  getCompositeProductById(@Path() id: string) {
    if (!isUuid(id))
      throw { status: 400, message: `Parámetro "id" debe ser un UUID válido` };

    return this.compositeProductsService.getCompositeProductById(id);
  }

  @Put('{id}')
  updateCompositeProductById(
    @Path() id: string,
    @Body() dto: CreateCompositeProductDto
  ) {
    if (!isUuid(id))
      throw { status: 400, message: `Parámetro "id" debe ser un UUID válido` };

    return this.compositeProductsService.updateCompositeProductById(id, dto);
  }

  @Delete('{id}')
  removeCompositeProductById(@Path() id: string) {
    if (!isUuid(id))
      throw { status: 400, message: `Parámetro "id" debe ser un UUID válido` };

    return this.compositeProductsService.removeCompositeProductById(id);
  }
}
