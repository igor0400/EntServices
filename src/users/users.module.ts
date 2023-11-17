import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories/users.repository';
import { DatabaseModule } from 'src/libs/common';
import { User } from './models/user.model';

@Module({
  imports: [DatabaseModule.forFeature([User])],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
