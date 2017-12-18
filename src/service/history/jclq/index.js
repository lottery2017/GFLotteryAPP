import * as requestService from '../../requestService';
import * as lotteryURL from '../../lotteryURL';

export default async function getJCLQLatestDayAwards(gameEn, dateString) {
  const url = await requestService.urlAddInterfaceHeader(lotteryURL.JCHISTORYLISAWARDURL, null);
  const para = `gameEn=${gameEn}&selectedDate=${dateString}`;
  return requestService.formPost(url, para).then(data => data).catch(error => error);
}
