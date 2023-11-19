export const getEmptyDays = (count: number) => {
  const days = [];

  for (let i = 0; i < count; i++) {
    days.push({ text: ' ', callback_data: `empty_calendar_date` });
  }

  return days;
};
