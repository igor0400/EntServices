import { Module, forwardRef } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { TextWaitersRepository } from './repositories/text-waiter.repository';
import { TextWaiter } from './models/text-waiter.model';
import { DatabaseModule } from 'src/libs/common';
import { UsersModule } from 'src/users/users.module';
import { GeneralModule } from 'src/general/general.module';
import { CalendarModule } from 'src/calendar/calendar.module';

@Module({
  imports: [
    DatabaseModule.forFeature([TextWaiter]),
    UsersModule,
    forwardRef(() => CalendarModule),
    forwardRef(() => GeneralModule),
  ],
  providers: [ListenersService, TextWaitersRepository],
  exports: [ListenersService, TextWaitersRepository],
})
export class ListenersModule {}
