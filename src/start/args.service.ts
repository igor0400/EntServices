import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Context } from 'telegraf';
import { StartService } from './start.service';
import { sendMessage } from 'src/general';

@Injectable()
export class StartArgsService {
  constructor(
    @Inject(forwardRef(() => StartService))
    private readonly startService: StartService,
  ) {}

  async argsHandler(ctx: Context | any) {
    const args = ctx?.args[0]?.split('-');
    const serviceType = args[0];

    // await sendMessage('⚠️ <b>Возможно ссылка устарела!</b>', {
    //   ctx,
    //   type: 'send',
    //   isBanner: false,
    // });
    await this.startService.sendStartMessage(ctx);
  }
}
