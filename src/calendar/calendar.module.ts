import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarUpdate } from './calendar.update';
import { GeneralModule } from 'src/general/general.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [GeneralModule, UsersModule],
  providers: [CalendarService, CalendarUpdate],
  exports: [CalendarService],
})
export class CalendarModule {}
