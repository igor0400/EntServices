import { Context } from 'telegraf';

export const getCtxData = (ctx: Context | any) => {
  if (ctx?.message?.from) {
    return { user: ctx?.message?.from, message: ctx?.message };
  } else {
    const query = ctx?.update?.callback_query;

    return {
      user: query?.from,
      message: query?.message,
      data: query?.data,
    };
  }
};
