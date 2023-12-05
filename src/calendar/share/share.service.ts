import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { ShareCalendarMonthsService } from '../months/share-months.service';
import { getMonthDifferenceByDateVal } from '../months/assets';
import { getZero } from 'src/libs/common';

@Injectable()
export class ShareCalendarService {
  constructor(
    private readonly shareMonthsService: ShareCalendarMonthsService,
  ) {}

  async argsHandler(ctx: Context | any) {
    const args = ctx?.args[0]?.split('-');
    const serviceType = args[1];
    const [month, year] = args[2]?.split('_');
    const userId = args[3];

    if (serviceType === 'm') {
      const incMouths = getMonthDifferenceByDateVal(
        `02.${getZero(month)}.${year}`,
      );

      await this.shareMonthsService.sendMouth(ctx, userId, incMouths);
    }
  }
}
