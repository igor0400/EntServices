import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';

@Injectable()
export class GeneralValidations {
  async startValidation(
    ctx: Context,
    validations: { stipulation: boolean; text: string }[],
  ) {
    for (let { stipulation, text } of validations) {
      if (stipulation) {
        // await sendTempMessage({ ctx, text, isDeleteInitMess: true });
        return false;
      }
    }

    return true;
  }
}
