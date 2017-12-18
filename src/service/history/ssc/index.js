import * as requestService from '../../requestService';
import * as lotteryURL from '../../lotteryURL';

export async function getNextPageAwards(gameEn, period) {
  const para = new Map().set('count', 10).set('gameEn', gameEn).set('period', period);
  const url = await requestService.urlAddInterfaceHeader(lotteryURL.HALL_LIST_QUERYAWARD, para);
  return requestService.xmlGet(url).then(json => json).catch(error => error);
}
export async function getLatestTwentyAwards(gameEn, period) {
  const para = new Map().set('count', 20).set('gameEn', gameEn).set('period', period);
  const url = await requestService.urlAddInterfaceHeader(lotteryURL.HALL_LIST_QUERYAWARD, para);
  return requestService.xmlGet(url).then(json => json).catch(error => error);
}
