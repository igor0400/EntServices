import { Module } from '@nestjs/common';
import { CalendarMonthsService } from './months/months.service';
import { CalendarMonthsUpdate } from './months/months.update';
import { GeneralModule } from 'src/general/general.module';
import { UsersModule } from 'src/users/users.module';
import { CalendarDaysService } from './days/days.service';
import { CalendarDaysUpdate } from './days/days.update';
import { EventsService } from './events/events.service';
import { EventsUpdate } from './events/events.update';
import { DatabaseModule } from 'src/libs/common';
import { CalendarEvent } from './models/calendar-event.model';

@Module({
  imports: [
    DatabaseModule.forFeature([CalendarEvent]),
    GeneralModule,
    UsersModule,
  ],
  providers: [
    CalendarMonthsService,
    CalendarMonthsUpdate,
    CalendarDaysService,
    CalendarDaysUpdate,
    EventsService,
    EventsUpdate,
  ],
  exports: [CalendarMonthsService],
})
export class CalendarModule {}
