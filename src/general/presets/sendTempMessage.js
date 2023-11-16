import { bot } from '../../../settings.js';

export const sendTempMessage = async ({
   ctx,
   text,
   isDeleteInitMess = false,
   time = 2000,
}) => {
   const mess = await ctx.reply(text, {
      parse_mode: 'html',
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
