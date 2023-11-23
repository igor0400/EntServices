import { Module } from '@nestjs/common';
import { NotificationsUpdate } from './notifications.update';
import { NotificationsService } from './notifications.service';

@Module({
  providers: [NotificationsUpdate, NotificationsService],
})
export class NotificationsModule {}
