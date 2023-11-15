import { Action, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';

@Update()
export class AppButtons {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Action('test_btn')
  async testButton(@Ctx() ctx: Context) {
    await ctx.reply("is's test bro!");
  }
}
