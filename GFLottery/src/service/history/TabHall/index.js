import * as requestService from '../../requestService';
import * as lotteryURL from '../../lotteryURL';

export async function getAwardHome() {
    const url = await requestService.urlAddInterfaceHeader(lotteryURL.AWARD_HOME);
    return requestService.get(url).then((data => data)).catch(error => error);
}

export async function getAwardInfoNew() {
    const url = await requestService.urlAddInterfaceHeader(lotteryURL.AWARD_AWARDINFONEW);
    return requestService.get(url).then((data => data)).catch(error => error);
}

export async function getNotices() {
    const url = await requestService.urlAddInterfaceHeader(lotteryURL.AWARD_RANKING);
    return requestService.get(url).then((data => data)).catch(error => error);
}
