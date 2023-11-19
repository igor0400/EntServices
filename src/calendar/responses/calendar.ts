import { backInlineBtn, formatKeyboard, getNowDate } from '../../general';
import { getEmptyDays } from '../assets';
import { months, weekDays } from '../configs';

export const calendarMessage = () => `<b>Календарь встреч/событий</b>

🗓 Календарь – это...

👇 Выберите день для...

<i>🟢 – день свободен
🟡 – день частично свободен
🔴 – день занят</i>`;

export const calendarMarkup = () => {
  const oldestDate = getNowDate();
  oldestDate.setMonth(oldestDate.getMonth() + 1);
  oldestDate.setDate(0);

  const maxDate = oldestDate.getDate();
  const maxDateDay = oldestDate.getDay();
  const newestDate = getNowDate();

  newestDate.setDate(1);
  const minDateDay = newestDate.getDay();

  const days = [];

  if (minDateDay !== 1) {
    days.push(...getEmptyDays(minDateDay - 1));
  }

  for (let i = 1; i < maxDate + 1; i++) {
    days.push({ text: `${i}`, callback_data: `${i}::calendar_date` });
  }

  const daysDiff = maxDate % 7;

  if (daysDiff !== 0 && maxDateDay !== 7) {
    days.push(...getEmptyDays(7 - maxDateDay));
  }

  return {
    inline_keyboard: [
      [months[oldestDate.getMonth()]],
      weekDays,
      ...formatKeyboard(days, 7),
      [
        { text: '◀️', callback_data: 'prev' },
        { text: '▶️', callback_data: 'next' },
      ],
      backInlineBtn,
    ],
  };
};
