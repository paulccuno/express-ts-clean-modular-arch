import { CreateIndividualProductDto } from './dto/create-individual-product.dto';
import { IndividualProductsService } from '../../services/individual-products.service';
import { container } from 'tsyringe';
import { Body, Controller, Delete, Get, Post, Put, Route, Tags } from 'tsoa';

@Route('individual-products')
@Tags('individual-products')
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
    console.log('getAllIndividualProducts');
    return this.individualProductsService.getAllIndividualProducts();
  }

  @Get('{id}')
  getIndividualProductById() {
    return this.individualProductsService.getIndividualProductById();
  }

  @Put('{id}')
  updateIndividualProductById() {
    return this.individualProductsService.updateIndividualProductById();
  }

  @Delete('{id}')
  removeIndividualProductById() {
    return this.individualProductsService.removeIndividualProductById();
  }
}
