import { injectable } from 'tsyringe';
import { CreateCompositeProductDto } from '../controllers/composite-products/dto/create-composite-product.dto';

@injectable()
export class CompositeProductsService {
  createCompositeProduct(createCompositeProductDto: CreateCompositeProductDto) {
    return createCompositeProductDto;
  }

  getAllCompositeProducts() {
    console.log(`Listar todos los productos compuestos`);
    return `Listar todos los productos compuestos`;
  }

  getCompositeProductById() {
    return `Obtener un producto compuesto por ID`;
  }

  updateCompositeProductById() {
    return `Actualizar un producto compuesto`;
  }

  removeCompositeProductById() {
    return `Eliminar un producto compuesto`;
  }
}
