import { sequelize } from '../config/database';
import CompositeProductItem from '../models/composite-product-item.model';
import CompositeProduct from '../models/composite-product.model';

export class CompositeProductRepository {
  async createCompositeProduct(
    data: Partial<CompositeProduct>
  ): Promise<CompositeProduct> {
    return sequelize.transaction(async (t) => {
      const product = await CompositeProduct.create(
        { nombre: data.nombre },
        { transaction: t }
      );

      const items = data.items!.map((individualProduct) => ({
        producto_compuesto_id: product.id,
        producto_individual_id: individualProduct.producto_individual_id,
        porcentaje_contribucion: individualProduct.porcentaje_contribucion,
      }));

      await CompositeProductItem.bulkCreate(items, { transaction: t });

      return await product.reload({
        include: [CompositeProductItem],
        transaction: t,
      });
    });
  }

  async getAllCompositeProducts(): Promise<CompositeProduct[]> {
    return CompositeProduct.findAll({ include: [CompositeProductItem] });
  }

  async getCompositeProductById(id: string): Promise<CompositeProduct | null> {
    return CompositeProduct.findByPk(id, { include: [CompositeProductItem] });
  }

  async updateCompositeProductById(
    id: string,
    data: Partial<CompositeProduct>
  ): Promise<CompositeProduct | null> {
    return sequelize.transaction(async (t) => {
      const product = await CompositeProduct.findByPk(id);

      if (!product)
        throw { status: 404, message: 'Producto compuesto no encontrado' };

      await product.update({ nombre: product.nombre }, { transaction: t });

      await CompositeProductItem.destroy({
        where: { producto_compuesto_id: id },
        transaction: t,
      });

      const items = data.items!.map((individualProducts) => ({
        producto_compuesto_id: id,
        producto_individual_id: individualProducts.producto_individual_id,
        porcentaje_contribucion: individualProducts.porcentaje_contribucion,
      }));

      await CompositeProductItem.bulkCreate(items, { transaction: t });

      return await product.reload({
        include: [CompositeProductItem],
        transaction: t,
      });
    });
  }

  async removeCompositeProductById(id: string): Promise<boolean> {
    return sequelize.transaction(async (t) => {
      await CompositeProductItem.destroy({
        where: { producto_compuesto_id: id },
        transaction: t,
      });

      const deleted = await CompositeProduct.destroy({
        where: { id },
        transaction: t,
      });

      return !!deleted;
    });
  }
}
