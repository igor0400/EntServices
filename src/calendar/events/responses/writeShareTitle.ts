import { backInlineBtn } from 'src/general';

export const writeShareTitleMessage = () => `<b>Создание события</b>

📝 Напишите название события:`;

export const writeShareTitleMarkup = (dataValue: string) => {
  return {
    inline_keyboard: [
      [
        {
          text: '↩️ Назад',
          callback_data: `${dataValue}::back_to_sh_c_e_e_t`,
        },
      ],
      backInlineBtn,
    ],
  };
};
