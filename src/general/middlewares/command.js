import { clearUserListeners } from '../../general/index.js';
import { getBanUserByUserId } from '../../users/index.js';
import { getCtxData, updateUserNamesByCtx } from '../assets/index.js';
import { banMessage } from '../responses/index.js';

export const commandMiddleware = async (ctx, func) => {
   const { user } = getCtxData(ctx);
   const userId = user.id;
   const banUser = await getBanUserByUserId(userId);

   if (ctx.command) {
      await updateUserNamesByCtx(ctx);
      await clearUserListeners(userId);
   }

   if (banUser) {
      await ctx.reply(banMessage(banUser.reason), {
         parse_mode: 'html',
      });
      return;
   }

   try {
      const data = await func(ctx);
      return data;
   } catch (e) {
      console.error('ERROR: ', e);
   }
};
