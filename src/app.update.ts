import { Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';

@Update()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Start()
  async startCommand(@Ctx() ctx: Context) {
    await ctx.reply('👋', {
      reply_markup: {
        inline_keyboard: [[{ text: 'Button', callback_data: 'test_btn' }]],
      },
    });
  }
}
