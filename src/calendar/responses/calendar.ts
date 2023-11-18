import { backInlineBtn, formatKeyboard } from '../../general';

export const calendarMessage = () => `<b>Календарь встреч/событий</b>

🗓 Календарь – это...

👇 Выберите день для...

<i>🟢 – день свободен
🟡 – день частично свободен
🔴 – день занят</i>`;

export const calendarMarkup = () => {
  const weekDays = [
    { text: 'Пн', callback_data: 'mon' },
    { text: 'Вт', callback_data: 'tue' },
    { text: 'Ср', callback_data: 'wed' },
    { text: 'Чт', callback_data: 'thu' },
    { text: 'Пт', callback_data: 'fri' },
    { text: 'Сб', callback_data: 'sat' },
    { text: 'Вс', callback_data: 'sun' },
  ];
  const date = new Date();
  date.setDate(-1);
  const maxDate = date.getDate();

  const days = [];

  for (let i = 1; i < maxDate + 1; i++) {
    days.push({ text: `🟢 ${i}`, callback_data: `${i}::calendar_date` });
  }

  const daysDiff = maxDate % 7;

  if (daysDiff !== 0) {
    const emptyDatesCount = 7 - daysDiff;

    for (let i = 0; i < emptyDatesCount; i++) {
      days.push({ text: ' ', callback_data: `empty_calendar_date` });
    }
  }

  return {
    inline_keyboard: [weekDays, ...formatKeyboard(days, 7), backInlineBtn],
  };
};
