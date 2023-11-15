import { Module } from '@nestjs/common';
import { MenuUpdate } from './menu.update';
import { MenuService } from './menu.service';

@Module({
  providers: [MenuService, MenuUpdate],
})
export class MenuModule {}
