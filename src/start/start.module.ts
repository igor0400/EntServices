import { Module } from '@nestjs/common';
import { StartService } from './start.service';
import { StartUpdate } from './start.update';
import { MenuModule } from '../menu/menu.module';
import { GeneralModule } from '../general/general.module';
import { UsersModule } from 'src/users/users.module';
import { CalendarModule } from 'src/calendar/calendar.module';

@Module({
  imports: [MenuModule, GeneralModule, UsersModule, CalendarModule],
  providers: [StartService, StartUpdate],
})
export class StartModule {}
