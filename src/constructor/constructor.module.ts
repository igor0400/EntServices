import { Module } from '@nestjs/common';
import { ConstructorService } from './constructor.service';
import { ConstructorUpdate } from './constructor.update';

@Module({
  providers: [ConstructorService, ConstructorUpdate],
})
export class ConstructorModule {}
