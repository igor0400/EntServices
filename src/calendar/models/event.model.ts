import { Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { AbstractModel } from 'src/libs/common';
import { CalendarEventMember } from './event-member.model';

export interface CalendarEventCreationArgs {
  from: string;
  till: string;
  type: string;
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
  from: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  till: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @HasMany(() => CalendarEventMember)
  members: CalendarEventMember[];
}
