// n일 전의 날짜를 YYYY-MM-DD 형태로 반환
export function getPreviousDate(date: Date, days: number) {
  const previousDate = new Date(date.getTime() - days * 86400000);
  return formatDate(previousDate);
}

//  1달전 의 날짜를 YYYY-MM-DD 형태로 반환
export function getPreviousMonth(date: Date) {
  const previousMonth = new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    date.getDate()
  );
  if (previousMonth.getMonth() !== date.getMonth() - 1) {
    previousMonth.setDate(0);
  }
  return formatDate(previousMonth);
}

export function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}
