import { Context } from 'telegraf';

export const closeMessageBtn = async (ctx: Context) => {
  await ctx.deleteMessage();
};
