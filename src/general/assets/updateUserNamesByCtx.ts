import { Context } from 'telegraf';
// import { updateUserNamesDataById } from '../../users/index.js';
import { getCtxData } from './getCtxData.js';

export const updateUserNamesByCtx = async (ctx: Context) => {
  const { user } = getCtxData(ctx);

  if (user) {
    // await updateUserNamesDataById({
    //   userId: user.id,
    //   firstName: user.first_name,
    //   lastName: user.last_name,
    //   userName: user.username,
    // });
  }
};
