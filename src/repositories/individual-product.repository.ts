import { injectable } from 'tsyringe';
import IndividualProduct from '../models/individual-product.model';

@injectable()
export class IndividualProductRepository {
  async createIndividualProduct(
    data: Partial<IndividualProduct>
  ): Promise<IndividualProduct> {
    return IndividualProduct.create(data);
  }

  async getAllIndividualProducts(): Promise<IndividualProduct[]> {
    return IndividualProduct.findAll();
  }

  async getIndividualProductById(
    id: string
  ): Promise<IndividualProduct | null> {
    return IndividualProduct.findByPk(id);
  }

  async updateIndividualProductById(
    id: string,
    data: Partial<IndividualProduct>
  ): Promise<IndividualProduct | null> {
    const product = await IndividualProduct.findByPk(id);
    if (!product) return null;
    return product.update(data);
  }

  async removeIndividualProductById(id: string): Promise<boolean> {
    const product = await IndividualProduct.findByPk(id);
    if (!product) return false;
    await product.destroy();
    return true;
  }

  async checkAllIndividualProductsExist(ids: string[]) {
    const count = await IndividualProduct.count({ where: { id: ids } });
    return count === ids.length;
  }
}
