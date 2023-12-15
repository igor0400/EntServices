import { Module } from '@nestjs/common';
import { ConstructorService } from './constructor.service';
import { ConstructorUpdate } from './constructor.update';
import { GeneralModule } from 'src/general/general.module';

@Module({
  imports: [GeneralModule],
  providers: [ConstructorService, ConstructorUpdate],
})
export class ConstructorModule {}
