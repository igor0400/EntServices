import { Module } from '@nestjs/common';
import { DatabaseModule as AppDatabaseModule } from 'src/libs/common';
import { TextWaiter } from 'src/listeners/models/text-waiter.model';
import { User } from 'src/users/models/user.model';

@Module({
  imports: [AppDatabaseModule.forRoot([User, TextWaiter])],
})
export class DatabaseModule {}
