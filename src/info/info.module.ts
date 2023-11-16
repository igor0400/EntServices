import { Module } from '@nestjs/common';
import { InfoService } from './info.service';

@Module({
  providers: [InfoService]
})
export class InfoModule {}
