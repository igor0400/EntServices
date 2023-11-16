import { infoMarkup, infoMessage } from '../general/responses/index.js';

export const infoBtn = async (ctx) => {
  await ctx.editMessageCaption(infoMessage(), {
    parse_mode: 'html',
    reply_markup: infoMarkup,
  });
};
