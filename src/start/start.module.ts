import { Module } from '@nestjs/common';
import { StartService } from './start.service';
import { StartUpdate } from './start.update';
import { MenuModule } from '../menu/menu.module';
import { GeneralModule } from '../general/general.module';

@Module({
  imports: [MenuModule, GeneralModule],
  providers: [StartService, StartUpdate],
})
export class StartModule {}
