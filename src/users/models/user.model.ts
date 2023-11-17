import { Column, Table, DataType } from 'sequelize-typescript';
import { AbstractModel } from 'src/libs/common';

export interface UserCreationArgs {
  telegramId: string;
  firstName: string;
  lastName: string;
  userName: string;
}

@Table({ tableName: 'users' })
export class User extends AbstractModel<User, UserCreationArgs> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  telegramId: string;

  @Column({
    type: DataType.STRING,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  userName: string;
}
