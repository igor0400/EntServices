import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesUpdate } from './services.update';

@Module({
  providers: [ServicesService, ServicesUpdate],
})
export class ServicesModule {}
