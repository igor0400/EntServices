import { Context, Telegraf } from 'telegraf';

interface Props {
  bot: Telegraf<Context>;
  ctx: Context;
  text: string;
  isDeleteInitMess?: boolean;
  time?: number;
}

export const sendTempMessage = async ({
  bot,
  ctx,
  text,
  isDeleteInitMess = false,
  time = 3000,
}: Props) => {
  const mess = await ctx.reply(text, {
    parse_mode: 'HTML',
  });

  setTimeout(async () => {
    if (isDeleteInitMess) {
      try {
        await ctx.deleteMessage();
      } catch (e) {}
    }
    try {
      await bot.telegram.deleteMessage(mess.chat.id, mess.message_id);
    } catch (e) {}
  }, time);
};
