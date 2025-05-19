import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import CompositeProduct from './composite-product.model';
import IndividualProduct from './individual-product.model';

@Table({ tableName: 'composite_product_items' })
export default class CompositeProductItem extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => CompositeProduct)
  @Column({ type: DataType.UUID, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  producto_compuesto_id!: string;

  @ForeignKey(() => IndividualProduct)
  @Column({ type: DataType.UUID, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  producto_individual_id!: string;

  @Column(DataType.DECIMAL(5, 2))
  porcentaje_contribucion!: number;

  @BelongsTo(() => CompositeProduct)
  compositeProduct!: CompositeProduct;

  @BelongsTo(() => IndividualProduct)
  individualProduct!: IndividualProduct;
}
