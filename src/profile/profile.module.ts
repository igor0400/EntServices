import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileUpdate } from './profile.update';
import { GeneralModule } from 'src/general/general.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [GeneralModule, UsersModule],
  providers: [ProfileService, ProfileUpdate],
})
export class ProfileModule {}
