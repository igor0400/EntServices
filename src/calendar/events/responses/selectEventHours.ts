import { backInlineBtn } from 'src/general';
import { ChangeToSelectHoursOpts } from '../events-additional.service';
import { CreatePaginationProps } from 'src/libs/pagination';
import { InlineBtnType } from 'src/general';

export const selectEventHoursMessage = ({
  type,
}: ChangeToSelectHoursOpts) => `<b>Создание события</b>

🕗 Выберите время ${type === 'start' ? 'начала' : 'окончания'} события:`;

export const selectEventHoursMarkup = async (
  dateVal: string,
  btns: string[],
  { callbackDataTitle, startTime, type }: ChangeToSelectHoursOpts,
  createPagination: (
    conf: Omit<CreatePaginationProps, 'userTelegramId'>,
  ) => Promise<InlineBtnType[][]>,
) => {
  const hoursBtns = [];

  for (let btn of btns) {
    hoursBtns.push({
      text: btn,
      callback_data: `${dateVal}-${startTime ?? btn}-${
        startTime ? btn : null
      }::${callbackDataTitle}`,
    });
  }

  const pagination = await createPagination({
    items: hoursBtns,
    pageItemsCount: 40,
    rowLen: 4,
    isEmptyFill: true,
  });

  return {
    inline_keyboard: [
      ...pagination,
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
