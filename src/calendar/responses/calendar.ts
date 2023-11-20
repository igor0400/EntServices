import { backInlineBtn, formatKeyboard, getNowDate } from '../../general';
import { getEmptyDays } from '../assets';
import { months, weekDays } from '../configs';

export const calendarMessage = () => `<b>Календарь встреч/событий</b>

🗓 Календарь – это сервис для удобного планирования встреч и событий.

👇 Вы можете поделиться ссылкой на свой календарь и вам не придется обсуждать время встречи, так как человек выберет его сам, основываясь на вашем графике.

При необходимости вы также можете отправить ссылку на конкретную дату, для этого выберите её и нажмите <b>поделиться ссылкой</b>.

<i>❌ – день недоступен</i>`;

export const calendarMarkup = (userId: string, incMouth = 0) => {
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
  const isMouthClear = daysDiff === 0 && minDateDay === 1;

  if (!isMouthClear && maxDateDay !== 0) {
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
      [
        {
          text: '🔗 Поделиться ссылкой',
          url: `https://t.me/share/url?url=https://t.me/EntServicesBot?start=cal-m-${
            oldestDate.getMonth() + 1
          }-${userId}&text=%D0%92%D0%BE%D1%82%20%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B0%20%D0%BD%D0%B0%20%D0%BA%D0%B0%D0%BB%D0%B5%D0%BD%D0%B4%D0%B0%D1%80%D1%8C%20%D0%BC%D0%BE%D0%B5%D0%B9%20%D0%B7%D0%B0%D0%BD%D1%8F%D1%82%D0%BE%D1%81%D1%82%D0%B8`,
        },
      ],
      backInlineBtn,
    ],
  };
};
