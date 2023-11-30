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
  { callbackDataTitle, startTime, type }: ChangeToSelectHoursOpts,
) => {
  const hoursBtns = [];

  for (let btn of btns) {
    hoursBtns.push({
      text: btn,
      callback_data: `${dateVal}-${btn}-${startTime}::${callbackDataTitle}`,
    });
  }

  // сделать либу для пагинации и выводить через нее кнопки времен
  // если кнопок меньше чем максимум на странице убирать стрелочки

  return {
    inline_keyboard: [
      ...formatKeyboard(hoursBtns, 5, true),
      [
        {
          text: '↩️ Назад',
          callback_data:
            type === 'start'
              ? `${dateVal}::back_to_calendar_date`
              : `${dateVal}::back_to_pers_cal_event_start_time`,
        },
      ],
      backInlineBtn,
    ],
  };
};
