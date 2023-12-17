import { Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { AbstractModel } from 'src/libs/common';
import { ChainField } from './chain-field.model';

export interface ChainCreationArgs {
  type: string;
  userId: string;
  chatId: string;
  messageId: string;
  extraData?: string;
}

@Table({ tableName: 'chains' })
export class Chain extends AbstractModel<Chain, ChainCreationArgs> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  chatId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  messageId: string;

  @Column({
    type: DataType.STRING,
  })
  extraData?: string;

  @HasMany(() => ChainField)
  fields: ChainField[];
}
