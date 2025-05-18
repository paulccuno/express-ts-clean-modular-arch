import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Default,
  HasMany,
} from 'sequelize-typescript';
import { CompositeProductItem } from './composite-product-item.model';

@Table({ tableName: 'composite_products' })
export class CompositeProduct extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column(DataType.STRING)
  nombre!: string;

  @HasMany(() => CompositeProductItem)
  items!: CompositeProductItem[];
}
