import { bot } from '../../settings.js';
import {
   backBtn,
   backWithClearBtn,
   closeMessageBtn,
   infoBtn,
   sendBackBtn,
   sendBackWithClearBtn,
} from './btns/index.js';
import { btnMiddleware } from './middlewares/index.js';

bot.action('back', (ctx) => btnMiddleware(ctx, backBtn));
bot.action('send_back', (ctx) => btnMiddleware(ctx, sendBackBtn));
bot.action('back_with_clear', (ctx) => btnMiddleware(ctx, backWithClearBtn));
bot.action('send_back_with_clear', (ctx) =>
   btnMiddleware(ctx, sendBackWithClearBtn)
);
bot.action('close_message', (ctx) => btnMiddleware(ctx, closeMessageBtn));
bot.action('info', (ctx) => btnMiddleware(ctx, infoBtn));

// в итоге должен получиться отдельный сервис со всем глобальными блоками
// перенести весть функционал из genegal в module, service и update и так же в info
// продумать и следовать структуре
// сделать декораторы для middlewares (commands, btns)

// доделать оформление кнопки текста и тд