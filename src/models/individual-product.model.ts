import {
  Model,
  Column,
  CreatedAt,
  DataType,
  Default,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'individual_products' })
export class IndividualProduct extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column(DataType.STRING)
  nombre!: string;

  @Column(DataType.TEXT)
  descripcion!: string;

  @CreatedAt
  @Column(DataType.DATE)
  fecha_creacion!: Date;
}
