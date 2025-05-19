import { inject, injectable } from 'tsyringe';
import { CreateIndividualProductDto } from '../dtos/individual-products/create-individual-product.dto';
import { IndividualProductRepository } from '../repositories/individual-product.repository';
import { Path } from 'tsoa';
import { validate as isUuid } from 'uuid';
import { UpdateIndividualProductDto } from '../dtos/individual-products/update-individual-product.dto';

@injectable()
export class IndividualProductsService {
  constructor(
    @inject(IndividualProductRepository)
    private readonly individualProductRepository: IndividualProductRepository
  ) {}

  async createIndividualProduct(dto: CreateIndividualProductDto) {
    const newProduct =
      await this.individualProductRepository.createIndividualProduct({
        nombre: dto.name,
        descripcion: dto.description,
      });

    return newProduct.get({ plain: true });
  }

  async getAllIndividualProducts() {
    const products =
      await this.individualProductRepository.getAllIndividualProducts();

    return products.map((product) => product.get({ plain: true }));
  }

  async getIndividualProductById(@Path() id: string) {
    const product =
      await this.individualProductRepository.getIndividualProductById(id);

    return product?.get({ plain: true });
  }

  async updateIndividualProductById(
    id: string,
    dto: UpdateIndividualProductDto
  ) {
    const updatedProduct =
      await this.individualProductRepository.updateIndividualProductById(id, {
        nombre: dto.name,
        descripcion: dto.description,
      });

    return updatedProduct?.get({ plain: true });
  }

  async removeIndividualProductById(id: string) {
    const removedProduct =
      await this.individualProductRepository.removeIndividualProductById(id);

    return removedProduct;
  }
}
