import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Context } from 'telegraf';
import { StartService } from './start.service';
import { ShareCalendarService } from 'src/calendar/share/share.service';
import { ShareConstructorService } from 'src/constructor/share/share.service';

@Injectable()
export class StartArgsService {
  constructor(
    @Inject(forwardRef(() => StartService))
    private readonly startService: StartService,
    private readonly shareCalendarService: ShareCalendarService,
    private readonly shareConstructorService: ShareConstructorService,
  ) {}

  async argsHandler(ctx: Context | any) {
    const args = ctx?.args[0]?.split('-');
    const serviceType = args[0];

    if (serviceType === 'cal') {
      return await this.shareCalendarService.argsHandler(ctx);
    }

    if (serviceType === 'con') {
      return await this.shareConstructorService.argsHandler(ctx);
    }

    await ctx.reply('⚠️ <b>Возможно ссылка устарела!</b>', {
      parse_mode: 'HTML',
    });
    await this.startService.sendStartMessage(ctx);
  }
}
