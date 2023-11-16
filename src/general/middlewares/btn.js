import { getBanUserByUserId } from '../../users/index.js';
import { getCtxData, updateUserNamesByCtx } from '../assets/index.js';
import { banMessage } from '../responses/index.js';

export const btnMiddleware = async (ctx, func) => {
   const { user } = getCtxData(ctx);
   const userId = user.id;
   const banUser = await getBanUserByUserId(userId);

   await updateUserNamesByCtx(ctx);

   if (banUser) {
      await ctx.editMessageCaption(banMessage(banUser.reason), {
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
