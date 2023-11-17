import { Module } from '@nestjs/common';
import { DatabaseModule as AppDatabaseModule } from 'src/libs/common';
import { User } from 'src/users/models/user.model';

@Module({
  imports: [AppDatabaseModule.forRoot([User])],
})
export class DatabaseModule {}
