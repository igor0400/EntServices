import { backInlineBtn } from 'src/general';

export const writeTitleMessage = () => `<b>Создание события</b>

📝 При желании напишите название события:`;

export const writeTitleMarkup = (dataValue: string) => {
  return {
    inline_keyboard: [
      [
        {
          text: 'Пропустить ➡️',
          callback_data: `${dataValue}::skip_pers_cal_event_title`,
        },
      ],
      [
        {
          text: '↩️ Назад',
          callback_data: `${dataValue}::back_to_pers_c_e_e_t`,
        },
      ],
      backInlineBtn,
    ],
  };
};
