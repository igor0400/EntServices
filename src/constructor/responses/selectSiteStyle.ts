import { backBarInlineBtns } from 'src/general';

export const selectSiteStyleMessage = () => `<b>Конструктор</b>

👇 Выберите стиль сайта:`;

export const selectSiteStyleMarkup = (category: string) => {
  return {
    inline_keyboard: [
      [
        {
          text: '📰 Классический',
          callback_data: `${category}_site_classic::fill_platform_data`,
        },
      ],
      [
        {
          text: '📄 Минимализм',
          callback_data: `${category}_site_minimalism::fill_platform_data`,
        },
      ],
      [
        {
          text: '⭐️ Luxury',
          callback_data: `${category}_site_luxury::fill_platform_data`,
        },
      ],
      [
        {
          text: '🎊 Брутализм',
          callback_data: `${category}_site_brutalism::fill_platform_data`,
        },
      ],
      ...backBarInlineBtns(`${category}::back_to_constructor_type`),
    ],
  };
};
