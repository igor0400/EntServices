import { backInlineBtn, getNowDate } from '../../general';
import { months, weekDays } from '../configs';

export const calendarV2Markup = () => {
  const date = getNowDate();
  const days = [];

  for (let i = 0; i < 7; i++) {
    const dateNum = date.getDate();
    const dayNum = date.getDay() === 0 ? 6 : date.getDay() - 1;

    days.push([
      {
        text: `${dateNum} | ${weekDays[dayNum].text} — 2 события — 🟢`,
        callback_data: `${i}::calendar_date`,
      },
    ]);
    date.setDate(dateNum + 1);
  }

  return {
    inline_keyboard: [
      [months[date.getMonth()]],
      ...days,
      [
        { text: '◀️', callback_data: 'prev' },
        { text: '▶️', callback_data: 'next' },
      ],
      backInlineBtn,
    ],
  };
};
