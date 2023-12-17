import { Column, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { AbstractModel } from 'src/libs/common';
import { Chain } from './chain.model';

export interface ChainFieldCreationArgs {
  chainId: string;
  name: string;
  data: string;
}

@Table({ tableName: 'chain_fields' })
export class ChainField extends AbstractModel<
  ChainField,
  ChainFieldCreationArgs
> {
  @ForeignKey(() => Chain)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  chainId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  data: string;
}
