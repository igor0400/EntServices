import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarUpdate } from './calendar.update';
import { GeneralModule } from 'src/general/general.module';

@Module({
  imports: [GeneralModule],
  providers: [CalendarService, CalendarUpdate],
})
export class CalendarModule {}
