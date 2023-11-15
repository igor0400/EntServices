import { Module } from '@nestjs/common';
import { StartService } from './start.service';
import { StartUpdate } from './start.update';

@Module({
  providers: [StartService, StartUpdate],
})
export class StartModule {}
