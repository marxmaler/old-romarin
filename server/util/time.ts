function timeFormat(time: number) {
  return String(time).padStart(2, "0");
}

export function getZeroTime(dateObj: Date) {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  const zerofiedDate = `${year}-${timeFormat(month)}-${timeFormat(date)}`;
  return new Date(zerofiedDate);
}

export function yyyymmdd(dateObj: Date) {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  const formattedDate = `${year}-${timeFormat(month)}-${timeFormat(date)}`;
  return formattedDate;
}

export function getEightDaysAgo(dateObj: Date) {
  const aWeekAgo = new Date(dateObj);
  aWeekAgo.setDate(aWeekAgo.getDate() - 8);
  return aWeekAgo;
}

export function getTomorrow(dateObj: Date) {
  const tomorrow = new Date(dateObj);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

export function getAWeekLater(dateObj: Date) {
  const aWeekLater = new Date(dateObj);
  aWeekLater.setDate(aWeekLater.getDate() + 7);
  return aWeekLater;
}

export function getAMonthLater(dateObj: Date) {
  const aMonthLater = new Date(dateObj);
  aMonthLater.setDate(aMonthLater.getDate() + 30);
  return aMonthLater;
}

export function getRegRev(dateObj: Date) {
  const today = getZeroTime(dateObj);
  const tomorrow = getTomorrow(today);
  const nextWeek = getAWeekLater(today);
  const nextMonth = getAMonthLater(today);
  const regRev = [today, tomorrow, nextWeek, nextMonth];
  return regRev;
}
