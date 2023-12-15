import { Module } from '@nestjs/common';
import { StartService } from './start.service';
import { StartUpdate } from './start.update';
import { MenuModule } from '../menu/menu.module';
import { GeneralModule } from '../general/general.module';
import { StartArgsService } from './args.service';
import { CalendarModule } from 'src/calendar/calendar.module';
import { ConstructorModule } from 'src/constructor/constructor.module';

@Module({
  imports: [MenuModule, GeneralModule, CalendarModule, ConstructorModule],
  providers: [StartService, StartUpdate, StartArgsService],
  exports: [StartService],
})
export class StartModule {}
