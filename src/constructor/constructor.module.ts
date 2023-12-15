import { Module } from '@nestjs/common';
import { ConstructorService } from './constructor.service';
import { ConstructorUpdate } from './constructor.update';
import { GeneralModule } from 'src/general/general.module';
import { ShareConstructorService } from './share/share.service';

@Module({
  imports: [GeneralModule],
  providers: [ConstructorService, ConstructorUpdate, ShareConstructorService],
  exports: [ConstructorService, ShareConstructorService],
})
export class ConstructorModule {}
