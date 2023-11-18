import { Module } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { ListenersUpdate } from './listeners.update';
import { TextWaitersRepository } from './repositories/users.repository';
import { TextWaiter } from './models/text-waiter.model';
import { DatabaseModule } from 'src/libs/common';

@Module({
  imports: [DatabaseModule.forFeature([TextWaiter])],
  providers: [ListenersService, ListenersUpdate, TextWaitersRepository],
  exports: [ListenersService, TextWaitersRepository],
})
export class ListenersModule {}
