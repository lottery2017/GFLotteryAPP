export function getPeriodString(awardTime, periodName) {
  const dateString = awardTime.split(' ')[0];
  const weekday = new Date(dateString).getDay();
  let weekDayString = '(星期日)';
  if (weekday === 0) {
    weekDayString = '(星期日)';
  } else if (weekday === 1) {
    weekDayString = '(星期一)';
  } else if (weekday === 2) {
    weekDayString = '(星期二)';
  } else if (weekday === 3) {
    weekDayString = '(星期三)';
  } else if (weekday === 4) {
    weekDayString = '(星期四)';
  } else if (weekday === 5) {
    weekDayString = '(星期五)';
  } else if (weekday === 6) {
    weekDayString = '(星期六)';
  }
  return `第${periodName}期 ${dateString} ${weekDayString}`;
}

export function getSimplePeriodSting(awardTime, periodName) {
  const dateString = awardTime.split(' ')[0];
  return `第${periodName}期 ${dateString}`;
}

// 精确到分钟
export function getPeriodTimeString(awardTime, periodName) {
  const dateString = awardTime.split(' ')[0];
  const dayTime = awardTime.split(' ')[1];
  const approximateDayTime = `${dayTime.split(':')[0]}:${dayTime.split(':')[1]}`;
  return `第${periodName}期 ${dateString} ${approximateDayTime}`;
}
