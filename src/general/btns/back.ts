// import { clearUserListeners } from '../../general/index.js';
import { changeToMenu, sendMenu } from '../../menu/index.js';
import { getCtxData } from '../assets/getCtxData.js';

export const backBtn = async (ctx) => {
   await changeToMenu(ctx);
};

export const sendBackBtn = async (ctx) => {
   await sendMenu(ctx);
};

export const backWithClearBtn = async (ctx) => {
   const { user } = getCtxData(ctx);
   await clearUserListeners(user.id);
   await changeToMenu(ctx);
};

export const sendBackWithClearBtn = async (ctx) => {
   const { user } = getCtxData(ctx);
   await clearUserListeners(user.id);
   await sendMenu(ctx);
};
