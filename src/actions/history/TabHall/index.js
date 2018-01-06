import {createAction} from 'redux-actions';
import {NativeModules} from 'react-native';
import * as types from '../../ActionTypes';
import * as tabHistoryHallService from '../../../service/history/TabHall';
import * as GlobalHelper from '../../../utils/GlobalHelper';
import * as CommentConfig from "../../../utils/CommonConfig";
import * as requestService from "../../../service/requestService";
import * as lotteryURL from "../../../service/lotteryURL";
import * as TYPES from "./type";

export const refreshAction = createAction(types.TABHISTORYHALLPAGE_REFRESHING);
export const loadingAction = createAction(types.TABHISTORYHALLPAGE_LOADING);

async function getGameEnArray() {
    const gameEns = CommentConfig.gameEns;
    return gameEns;
}

export const getAwardHomeAction = createAction(types.TABHISTORYHALLPAGE_GETAWARDHOME, async () => {
    const [awardHome, awardInfoNew, gameEns, awardRank] =
        await Promise.all([tabHistoryHallService.getAwardHome(),
            tabHistoryHallService.getAwardInfoNew(),
            getGameEnArray(),
            tabHistoryHallService.getNotices()
        ]);
    return {
        awardInfo: (awardHome === null || awardHome.data === null) ? [] : awardHome.data,
        awardInfoNew: awardInfoNew !== null ? awardInfoNew : {},
        gameEnArray: gameEns !== null ? gameEns : [],
        awardRankArray: awardRank !== null ? GlobalHelper.shuffle(awardRank.awardRankList) : [],
    };
});

//获取开奖信息
export async function getAwardHome() {
    const url = await requestService.urlAddInterfaceHeader(lotteryURL.AWARD_HOME);
    return ((dispatch) => {
        dispatch({'type': TYPES.TABHISTORYHALLPAGE_GETAWARDINFO_DOING});
        requestService.get(url).then((data) => {
            dispatch({'type': TYPES.TABHISTORYHALLPAGE_GETAWARDINFO_DONE, data: data});
        }).catch((error) => {
            dispatch({'type': TYPES.TABHISTORYHALLPAGE_GETAWARDINFO_ERR, error: error});
        })
    })
}

export function getRefreshDataAction() {
    return async (dispatch) => {
        dispatch(getAwardHomeAction());
    };
}
