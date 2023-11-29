import { backInlineBtn } from 'src/general';
import { formatKeyboard } from 'src/libs/common';
import { ChangeToSelectHoursOpts } from '../events-additional.service';

export const selectEventHoursMessage = ({
  type,
}: ChangeToSelectHoursOpts) => `<b>Создание события</b>

🕗 Выберите время ${type === 'start' ? 'начала' : 'окончания'} события:`;

export const selectEventHoursMarkup = (
  dateVal: string,
  btns: string[],
  { callbackDataTitle, startTime }: ChangeToSelectHoursOpts,
) => {
  const hoursBtns = [];

  for (let btn of btns) {
    hoursBtns.push({
      text: btn,
      callback_data: `${dateVal}-${btn}-${startTime}::${callbackDataTitle}`,
    });
  }

  return {
    inline_keyboard: [
      ...formatKeyboard(hoursBtns, 6, true),
      [
        {
          text: '↩️ Назад',
          callback_data: `${dateVal}::back_to_calendar_date`,
        },
      ],
      backInlineBtn,
    ],
  };
};
