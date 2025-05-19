import { inject, injectable } from 'tsyringe';
import { CreateCompositeProductDto } from '../dtos/composite-products/create-composite-product.dto';
import IndividualProduct from '../models/individual-product.model';
import { sequelize } from '../config/database';
import CompositeProduct from '../models/composite-product.model';
import { CompositeProductRepository } from '../repositories/composite-product.repository';
import { IndividualProductRepository } from '../repositories/individual-product.repository';
import CompositeProductItem from '../models/composite-product-item.model';

@injectable()
export class CompositeProductsService {
  constructor(
    @inject(IndividualProductRepository)
    private readonly individualProductRepository: IndividualProductRepository,
    @inject(CompositeProductRepository)
    private readonly compositeProductRepository: CompositeProductRepository
  ) {}

  async createCompositeProduct(dto: CreateCompositeProductDto) {
    const totalPercentage = dto.subProducts.reduce(
      (acc, p) => acc + p.contributionPercentage,
      0
    );

    if (totalPercentage !== 100) {
      throw {
        status: 400,
        message: 'La suma de porcentajes debe ser igual a 100%',
      };
    }

    const nonExistent: string[] = [];

    await Promise.all(
      dto.subProducts.map(async (product) => {
        const subProduct =
          await this.individualProductRepository.getIndividualProductById(
            product.id
          );
        const exists = !!subProduct;
        if (!exists) nonExistent.push(product.id);
        return exists;
      })
    );

    if (nonExistent.length > 0) {
      throw {
        status: 400,
        message: `Uno o más productos individuales no existen: ${nonExistent.toString()}`,
      };
    }

    const newProduct =
      await this.compositeProductRepository.createCompositeProduct({
        nombre: dto.name,
        items: dto.subProducts.map((sb) => ({
          producto_individual_id: sb.id,
          porcentaje_contribucion: sb.contributionPercentage,
        })) as CompositeProductItem[],
      });

    return newProduct.get({ plain: true });
  }

  async getAllCompositeProducts() {
    const products =
      await this.compositeProductRepository.getAllCompositeProducts();

    return products.map((product) => product.get({ plain: true }));
  }

  async getCompositeProductById(id: string) {
    const product =
      await this.compositeProductRepository.getCompositeProductById(id);

    return product?.get({ plain: true });
  }

  async updateCompositeProductById(id: string, dto: CreateCompositeProductDto) {
    const porcentaje = dto.subProducts.reduce(
      (acc, s) => acc + s.contributionPercentage,
      0
    );
    if (porcentaje !== 100) {
      throw {
        status: 400,
        message: 'La suma de porcentajes debe ser igual a 100%',
      };
    }

    const nonExistent: string[] = [];

    await Promise.all(
      dto.subProducts.map(async (product) => {
        const subProduct =
          await this.individualProductRepository.getIndividualProductById(
            product.id
          );
        const exists = !!subProduct;
        if (!exists) nonExistent.push(product.id);
        return exists;
      })
    );

    if (nonExistent.length > 0) {
      throw {
        status: 400,
        message: `Uno o más productos individuales no existen: ${nonExistent.toString()}`,
      };
    }

    const updatedProduct =
      await this.compositeProductRepository.updateCompositeProductById(id, {
        nombre: dto.name,
        items: dto.subProducts.map((sp) => ({
          producto_individual_id: sp.id,
          porcentaje_contribucion: sp.contributionPercentage,
        })) as CompositeProductItem[],
      });

    return updatedProduct?.get({ plain: true });
  }

  async removeCompositeProductById(id: string) {
    const removedProduct =
      await this.compositeProductRepository.removeCompositeProductById(id);

    return removedProduct;
  }
}
