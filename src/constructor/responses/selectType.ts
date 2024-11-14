import { backBarInlineBtns } from 'src/general';
import { typesByCategory } from '../configs';

export const selectTypeMessage = () => `<b>Конструктор</b>

👇 Выберите тип платформы:`;

export const selectTypeMarkup = (category: string) => {
  const typesBtns = [];
  const types = typesByCategory[category];

  if (types) {
    for (let { text, callback_data } of types) {
      typesBtns.push([
        {
          text,
          callback_data: callback_data
            ?.replaceAll('<default>', 'constructor_local_settings')
            ?.replaceAll('<category>', category),
        },
      ]);
    }
  }

  return {
    inline_keyboard: [
      ...typesBtns,
      ...backBarInlineBtns('back_to_constructor'),
    ],
  };
};
