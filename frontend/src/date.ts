export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function toISODate(year: number, month: number, day: number) {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

export function getWeekIndex(day: number) {
  // dia 1-7 => semana 1, 8-14 => semana 2...
  return Math.ceil(day / 7);
}
