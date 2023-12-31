import { Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { AbstractModel } from 'src/libs/common';
import { CalendarEventMember } from './event-member.model';

export interface CalendarEventCreationArgs {
  creatorId: string;
  title?: string;
  startTime: string;
  endTime: string;
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
  creatorId: string;

  @Column({
    type: DataType.STRING,
  })
  title?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  startTime: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  endTime: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @HasMany(() => CalendarEventMember)
  members: CalendarEventMember[];
}
