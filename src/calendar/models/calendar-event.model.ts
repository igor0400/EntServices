import { Column, Table, DataType } from 'sequelize-typescript';
import { AbstractModel } from 'src/libs/common';

export interface CalendarEventCreationArgs {
  userId: string;
  userTelegramId: string;
}

@Table({ tableName: 'calendar_events' })
export class CalendarEvent extends AbstractModel<
  CalendarEvent,
  CalendarEventCreationArgs
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userTelegramId: string;
}
