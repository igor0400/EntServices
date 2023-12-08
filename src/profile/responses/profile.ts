import { backInlineBtn } from 'src/general';
import { getUserName } from 'src/libs/common';
import { User } from 'src/users/models/user.model';

export const profileMessage = (user: User) => `<b>Профиль</b>

🎓 Вы: ${getUserName(user)}
🔢 Ваш ID: <code>${user.telegramId}</code>`;

export const profileMarkup = (userId: string) => ({
  inline_keyboard: [
    [{ text: '📨 Подписки', callback_data: `${userId}::user_subscriptions` }],
    backInlineBtn,
  ],
});
