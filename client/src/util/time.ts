function timeFormat(time: number) {
  return String(time).padStart(2, "0");
}

export function getZeroTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
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

export function getTomorrow(dateObj: Date) {
  const tomorrow = new Date(dateObj);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

export function getNDaysBeforeDate(n: number) {
  const nDaysFromDate = getZeroTime();
  nDaysFromDate.setDate(nDaysFromDate.getDate() - n);
  return nDaysFromDate;
}

export function getAWeekLater() {
  const aWeekLater = new Date();
  aWeekLater.setDate(aWeekLater.getDate() + 7);
  return aWeekLater;
}

export function getAMonthLater() {
  const aMonthLater = new Date();
  aMonthLater.setDate(aMonthLater.getDate() + 30);
  return aMonthLater;
}

export function getEightDateArray() {
  const today = getZeroTime();
  const pastWeek = [];
  for (let i = 7; i > 0; i--) {
    pastWeek.push(getNDaysBeforeDate(i));
  }
  return [...pastWeek, today];
}
