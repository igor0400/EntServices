import { sendTempMessage } from '../presets/index.js';

export const latterBtn = async (ctx) => {
  await sendTempMessage({ ctx, text: '⏳ <b>Скоро...</b>' });
};
