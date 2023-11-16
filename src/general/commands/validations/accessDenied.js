import { getUserById } from '../../../users/index.js';
import { sendTempMessage } from '../../presets/index.js';

export const accessDenied = async (
   ctx,
   acceptRanks = ['ADMIN', 'SUPER_ADMIN']
) => {
   const adminId = ctx.update.message.from.id;
   const admin = await getUserById(adminId);

   if (!admin || !acceptRanks.includes(admin.user_rank)) {
      await sendTempMessage({
         ctx,
         text: '🚫 <b>У вас нет прав на выполнение данной команды.</b>',
         isDeleteInitMess: true,
         time: 4000,
      });
      return true;
   }

   return false;
};
