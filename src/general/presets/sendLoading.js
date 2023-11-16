import { bot } from '../../../settings.js';

export const sendLoading = async (ctx, initText = '♻️ Загрузка') => {
   let isWork = true;
   let count = 2;
   let type = 'dec';

   const message = await ctx.sendMessage(textWrapper(`${initText}...`), {
      parse_mode: 'HTML',
   });

   const internalId = setInterval(async () => {
      let text = initText;
      for (let i = 0; i < count; i++) {
         text += '.';
      }

      if (type === 'inc') {
         count++;
      } else {
         count--;
      }

      if (count === 0) {
         type = 'inc';
      }

      if (count === 3) {
         type = 'dec';
      }

      try {
         await bot.telegram.editMessageText(
            message.chat.id,
            message.message_id,
            undefined,
            textWrapper(text),
            {
               parse_mode: 'HTML',
            }
         );
      } catch (e) {}
   }, 500);

   const chatId = message.chat.id;
   const messageId = message.message_id;

   return {
      messageId,
      chatId,
      isWork,
      stop: () => {
         isWork = false;
         clearInterval(internalId);
      },
      stopAndDelete: async () => {
         isWork = false;
         clearInterval(internalId);
         try {
            await bot.telegram.deleteMessage(chatId, messageId);
         } catch (e) {}
      },
   };
};

function textWrapper(text) {
   return `<b>${text}</b>`;
}
