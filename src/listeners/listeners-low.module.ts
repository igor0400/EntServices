import { Module, forwardRef } from '@nestjs/common';
import { ListenersUpdate } from './listeners.update';
import { GeneralModule } from 'src/general/general.module';
import { ListenersModule } from './listeners.module';

@Module({
  imports: [forwardRef(() => GeneralModule), forwardRef(() => ListenersModule)],
  providers: [ListenersUpdate],
})
export class ListenersLowModule {}
