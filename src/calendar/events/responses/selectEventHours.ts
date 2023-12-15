import { backInlineBtn, localBackInlineBtn } from 'src/general';
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
  {
    callbackDataTitle,
    startTime,
    type,
    calType = 'pers',
    userId,
  }: ChangeToSelectHoursOpts,
  createPagination: (
    conf: Omit<CreatePaginationProps, 'userTelegramId'>,
  ) => Promise<InlineBtnType[][]>,
) => {
  const hoursBtns = [];
  const textCalType = calType === 'share' ? 'sh' : 'pers';

  for (let btn of btns) {
    hoursBtns.push({
      text: btn,
      callback_data: `${dateVal}-${startTime ?? btn}-${startTime ? btn : null}${
        userId ? `_${userId}` : ''
      }::${callbackDataTitle}`,
    });
  }

  if (!hoursBtns.length) {
    hoursBtns.push({
      text: '🤷‍♂️ Список пуст',
      callback_data: `empty_select_time`,
    });
  }

  const pagination = await createPagination({
    items: hoursBtns,
    pageItemsCount: 40,
    rowLen: 4,
    isEmptyFill: true,
  });

  const backCBData =
    type === 'start'
      ? `${dateVal}${userId ? `_${userId}` : ''}::back_to${
          calType === 'share' ? `_${calType}` : ''
        }_calendar_date`
      : `${dateVal}${
          userId ? `_${userId}` : ''
        }::back_to_${textCalType}_c_e_s_t`;

  return {
    inline_keyboard: [
      ...pagination,
      localBackInlineBtn(backCBData),
      backInlineBtn,
    ],
  };
};
