import { Module } from '@nestjs/common';
import { StartService } from './start.service';
import { StartUpdate } from './start.update';
import { MenuModule } from 'src/menu/menu.module';

@Module({
  imports: [MenuModule],
  providers: [StartService, StartUpdate],
})
export class StartModule {}
