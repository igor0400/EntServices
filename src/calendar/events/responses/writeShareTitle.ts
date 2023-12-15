import { backInlineBtn, localBackInlineBtn } from 'src/general';

export const writeShareTitleMessage = () => `<b>Создание события</b>

📝 Напишите название события:`;

export const writeShareTitleMarkup = (dataValue: string) => {
  return {
    inline_keyboard: [
      localBackInlineBtn(`${dataValue}::back_to_sh_c_e_e_t`),
      backInlineBtn,
    ],
  };
};
