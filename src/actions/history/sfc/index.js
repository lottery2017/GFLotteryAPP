import {createAction} from 'redux-actions';
import {NativeModules} from 'react-native';
import * as types from '../../ActionTypes';
import * as SFCHistoryListService from '../../../service/history/sfc';


export const refreshAction = createAction(types.SFCHISTORYLIST_REFRESHING);
export const loadingAction = createAction(types.SFCHISTORYLIST_LOADING);
export const clearDataAction = createAction(types.SFCHISTORYLIST_CLEARDATA);// 清空数据

// 获得最近的20条数据
export const getLatestTwentyAwards = createAction(types.SFCHISTORYLIST_REFRESHLIST,
    async (gameEn, periodName) => {
        let latestTwentyItems = await SFCHistoryListService.getLatestTwentyAwards(gameEn, periodName);
        if (latestTwentyItems && latestTwentyItems.lottery && latestTwentyItems
                .lottery.game && latestTwentyItems.lottery.game
                .period) {
            if (Object.prototype.toString.call(latestTwentyItems.lottery.game
                    .period).indexOf('Object') !== -1) {
                latestTwentyItems = [latestTwentyItems.lottery.game
                    .period];
            } else if (Object.prototype.toString.call(latestTwentyItems.lottery.game
                    .period).indexOf('Array') !== -1) {
                latestTwentyItems = latestTwentyItems.lottery.game
                    .period;
            }
        } else {
            latestTwentyItems = [];
        }
        return {
            latestTwentyItems: latestTwentyItems,
        };
    });

export function getRefreshDataAction(gameEn, periodName) {
    return async (dispatch) => {
        dispatch(getLatestTwentyAwards(gameEn, periodName));
    };
}

// 获得下一页数据
export const getNextPageAwards = createAction(types.SFCHISTORYLIST_GETNEXTPAGE,
    async (gameEn, lastPeriod) => {
        const nextPageItems = await SFCHistoryListService.getNextPageAwards(gameEn, lastPeriod);
        return {
            nextPageItems: nextPageItems && nextPageItems.lottery && nextPageItems.lottery
                .game.period && nextPageItems.lottery.game.period ? nextPageItems.lottery.game.period : [],
        };
    });

export function getNextPageAwardsAction(gameEn, lastPeriod) {
    return async (dispatch) => {
        dispatch(getNextPageAwards(gameEn, lastPeriod));
    };
}

