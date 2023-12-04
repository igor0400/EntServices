import { Module, forwardRef } from '@nestjs/common';
import { CalendarMonthsService } from './months/months.service';
import { CalendarMonthsUpdate } from './months/months.update';
import { GeneralModule } from 'src/general/general.module';
import { UsersModule } from 'src/users/users.module';
import { CalendarDaysService } from './days/days.service';
import { CalendarDaysUpdate } from './days/days.update';
import { EventsService } from './events/events.service';
import { EventsUpdate } from './events/events.update';
import { DatabaseModule } from 'src/libs/common';
import { CalendarEvent } from './models/event.model';
import { CalendarEventMember } from './models/event-member.model';
import { CalendarBusyDay } from './models/busy-day.model';
import { EventsRepository } from './repositories/event.repository';
import { EventsMembersRepository } from './repositories/event-member.repository';
import { BusyDaysRepository } from './repositories/busy-day.repository';
import { EventsAdditionalService } from './events/events-additional.service';
import { PaginationModule } from 'src/libs/pagination';
import { ListenersModule } from 'src/listeners/listeners.module';
import { ShareCalendarService } from './share/share.service';
import { ShareCalendarMonthsService } from './months/share-months.service';
import { ShareCalendarMonthsUpdate } from './months/share-months.update';

@Module({
  imports: [
    DatabaseModule.forFeature([
      CalendarEvent,
      CalendarEventMember,
      CalendarBusyDay,
    ]),
    forwardRef(() => GeneralModule),
    UsersModule,
    PaginationModule,
    forwardRef(() => ListenersModule),
  ],
  providers: [
    CalendarMonthsService,
    CalendarMonthsUpdate,
    CalendarDaysService,
    CalendarDaysUpdate,
    EventsService,
    EventsUpdate,
    EventsRepository,
    EventsMembersRepository,
    BusyDaysRepository,
    EventsAdditionalService,
    ShareCalendarService,
    ShareCalendarMonthsService,
    ShareCalendarMonthsUpdate,
  ],
  exports: [CalendarMonthsService, EventsService, ShareCalendarService],
})
export class CalendarModule {}
