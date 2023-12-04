export function getMonthDifference(date1: Date, date2: Date = new Date()) {
  let months = (date1.getUTCFullYear() - date2.getUTCFullYear()) * 12;
  months -= date2.getUTCMonth();
  months += date1.getUTCMonth();

  return months;
}
