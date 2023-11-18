import { Column, Table, DataType } from 'sequelize-typescript';
import { AbstractModel } from 'src/libs/common';

export interface TextWaiterCreationArgs {
  type: string;
  userId: string;
  chatId: string;
  messageId: string;
  extraData?: string;
}

@Table({ tableName: 'text_waiters' })
export class TextWaiter extends AbstractModel<
  TextWaiter,
  TextWaiterCreationArgs
> {
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
  extraData: string;
}
