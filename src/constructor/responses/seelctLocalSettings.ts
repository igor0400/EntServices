import { backInlineBtn, localBackInlineBtn } from 'src/general';

export const selectLocalSettingsMessage = (
  typeText?: string,
) => `<b>Конструктор</b>

👇 Выберите${typeText ? ` ${typeText}` : ''}:`;

export const selectLocalSettingsMarkup = (type: string, category: string) => {
  // сделать chain и заполнение данных о сайте

  return {
    inline_keyboard: [
      localBackInlineBtn(`${category}::back_to_constructor_type`),
      backInlineBtn,
    ],
  };
};
