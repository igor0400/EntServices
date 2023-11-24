import { CalendarBusyDay } from 'src/calendar/models/busy-day.model';
import { backInlineBtn, formatKeyboard, getNowDate } from '../../../general';
import { getEmptyDays } from '../../assets';
import { months, weekDays } from '../../configs';

export const calendarMonthsMessage = () => `<b>Календарь встреч/событий</b>

🗓 Календарь – это сервис для удобного планирования встреч и событий.

👇 Вы можете поделиться ссылкой на свой календарь и вам не придется обсуждать время встречи, так как человек выберет его сам, основываясь на вашем графике.

При необходимости вы также можете отправить ссылку на конкретную дату, для этого выберите её и нажмите <b>поделиться ссылкой</b>.

<i>❌ – день недоступен</i>`;

export const calendarMonthsMarkup = (
  userId: string,
  busyDays: CalendarBusyDay[],
  incMouth = 0,
) => {
  const oldestDate = getNowDate();
  oldestDate.setUTCMonth(oldestDate.getUTCMonth() + 1 + incMouth);
  oldestDate.setUTCDate(0);
  const maxDate = oldestDate.getUTCDate();
  const maxDateDay = oldestDate.getUTCDay();

  const newestDate = getNowDate();
  newestDate.setUTCMonth(newestDate.getUTCMonth() + incMouth);
  newestDate.setUTCDate(1);
  const minDateDay = newestDate.getUTCDay();

  console.log(newestDate, oldestDate);

  const days = [];

  if (minDateDay !== 1) {
    days.push(...getEmptyDays(minDateDay === 0 ? 6 : minDateDay - 1));
  }

  for (let i = 1; i < maxDate + 1; i++) {
    const isBusy = busyDays.map((i) => i.date).includes(i);

    days.push({
      text: isBusy ? '❌' : `${i}`,
      callback_data: `${i}.${
        oldestDate.getUTCMonth() + 1
      }.${oldestDate.getUTCFullYear()}::calendar_date`,
    });
  }

  const daysDiff = maxDate % 7;
  const isMouthClear = daysDiff === 0 && minDateDay === 1;

  if (!isMouthClear && maxDateDay !== 0) {
    days.push(...getEmptyDays(7 - maxDateDay));
  }

  const mouthBtn = months[oldestDate.getUTCMonth()];

  return {
    inline_keyboard: [
      [
        {
          ...mouthBtn,
          text: `${mouthBtn.text} ${oldestDate.getUTCFullYear()}`,
        },
      ],
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
            oldestDate.getUTCMonth() + 1
          }.${oldestDate.getUTCFullYear()}-${userId}&text=%D0%92%D0%BE%D1%82%20%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B0%20%D0%BD%D0%B0%20%D0%BA%D0%B0%D0%BB%D0%B5%D0%BD%D0%B4%D0%B0%D1%80%D1%8C%20%D0%BC%D0%BE%D0%B5%D0%B9%20%D0%B7%D0%B0%D0%BD%D1%8F%D1%82%D0%BE%D1%81%D1%82%D0%B8`,
        },
      ],
      backInlineBtn,
    ],
  };
};
