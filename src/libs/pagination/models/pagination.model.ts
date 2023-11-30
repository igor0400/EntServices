import { Column, Table, DataType } from 'sequelize-typescript';
import { AbstractModel } from 'src/libs/common';

export interface PaginationCreationArgs {
  userTelegramId: string;
  items: string;
  pageItemsCount?: number;
  rowLen?: number;
  isEmptyFill?: boolean;
  isShowCount?: boolean;
  dontHideNavbar?: boolean;
}

@Table({ tableName: 'paginations' })
export class Pagination extends AbstractModel<
  Pagination,
  PaginationCreationArgs
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userTelegramId: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  items: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 20,
  })
  pageItemsCount?: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 5,
  })
  rowLen?: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isEmptyFill?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isShowCount?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  dontHideNavbar?: boolean;
}
