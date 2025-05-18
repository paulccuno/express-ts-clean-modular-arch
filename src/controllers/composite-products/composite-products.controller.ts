import { Body, Controller, Delete, Get, Post, Put, Route, Tags } from 'tsoa';
import { CompositeProductsService } from '../../services/composite-products.service';
import { container } from 'tsyringe';
import { CreateCompositeProductDto } from './dto/create-composite-product.dto';

@Route('composite-products')
@Tags('composite-products')
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
  getCompositeProductById() {
    return this.compositeProductsService.getCompositeProductById();
  }

  @Put('{id}')
  updateCompositeProductById() {
    return this.compositeProductsService.updateCompositeProductById();
  }

  @Delete('{id}')
  removeCompositeProductById() {
    return this.compositeProductsService.removeCompositeProductById();
  }
}
