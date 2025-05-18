import { injectable } from 'tsyringe';
import { CreateIndividualProductDto } from '../controllers/individual-products/dto/create-individual-product.dto';

@injectable()
export class IndividualProductsService {
  createIndividualProduct(
    createIndividualProductDto: CreateIndividualProductDto
  ) {
    return createIndividualProductDto;
  }

  getAllIndividualProducts() {
    console.log(`Listar todos los productos individuales`);
    return `Listar todos los productos individuales`;
  }

  getIndividualProductById() {
    return `Obtener un producto individual por ID`;
  }

  updateIndividualProductById() {
    return `Actualizar un producto individual`;
  }

  removeIndividualProductById() {
    return `Eliminar un producto individual`;
  }
}
