import { backInlineBtn, formatKeyboard, getNowDate } from '../../general';
import { getEmptyDays } from '../assets';
import { months, weekDays } from '../configs';

export const calendarMessage = () => `<b>Календарь встреч/событий</b>

🗓 Календарь – это...

👇 Выберите день для...

<i>❌ – день недоступен</i>`;

export const calendarMarkup = (incMouth = 0) => {
  const oldestDate = getNowDate();
  oldestDate.setMonth(oldestDate.getMonth() + 1 + incMouth);
  oldestDate.setDate(0);
  const maxDate = oldestDate.getDate();
  const maxDateDay = oldestDate.getDay();

  const newestDate = getNowDate();
  newestDate.setMonth(newestDate.getMonth() + incMouth);
  newestDate.setDate(1);
  const minDateDay = newestDate.getDay();

  const days = [];

  if (minDateDay !== 1) {
    days.push(...getEmptyDays(minDateDay === 0 ? 6 : minDateDay - 1));
  }

  for (let i = 1; i < maxDate + 1; i++) {
    days.push({
      text: i > 4 && i < 8 ? '❌' : `${i}`,
      callback_data: `${i}::calendar_date`,
    });
  }

  const daysDiff = maxDate % 7;

  if (daysDiff !== 0 && maxDateDay !== 0) {
    days.push(...getEmptyDays(7 - maxDateDay));
  }

  const mouthBtn = months[oldestDate.getMonth()];

  return {
    inline_keyboard: [
      [{ ...mouthBtn, text: `${mouthBtn.text} ${oldestDate.getFullYear()}` }],
      weekDays,
      ...formatKeyboard(days, 7),
      [
        { text: '◀️', callback_data: `${incMouth}::prev_calendar_mouth` },
        { text: '▶️', callback_data: `${incMouth}::next_calendar_mouth` },
      ],
      backInlineBtn,
    ],
  };
};
