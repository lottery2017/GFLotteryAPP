import { createAction } from 'redux-actions';
import { NativeModules } from 'react-native';
import * as types from '../../ActionTypes';
import * as SSCHistoryListService from '../../../service/history/ssc';

export const refreshAction = createAction(types.SSCHISTORYLIST_REFRESHING);
export const clearDataAction = createAction(types.SSCHISTORYLIST_CLEARDATA);// 清空数据

// 获得最近的20条数据
export const getLatestTwentyAwards = createAction(types.SSCHISTORYLIST_REFRESHLIST,
async (gameEn,periodName) => {
  const latestTwentyItems = await SSCHistoryListService.getLatestTwentyAwards(gameEn, periodName);
  return {
    latestTwentyItems: latestTwentyItems && latestTwentyItems.lottery && latestTwentyItems
    .lottery.game && latestTwentyItems.lottery.game
    .period ? latestTwentyItems.lottery.game.period : [],
  };
});

export function getRefreshDataAction(gameEn,periodName) {
  return async (dispatch) => {
    dispatch(getLatestTwentyAwards(gameEn,periodName));
  };
}

// 获得下一页数据
export const getNextPageAwards = createAction(types.SSCHISTORYLIST_GETNEXTPAGE,
async (gameEn, lastPeriod) => {
  const nextPageItems = await SSCHistoryListService.getNextPageAwards(gameEn, lastPeriod);
  return {
    nextPageItems: nextPageItems && nextPageItems.lottery && nextPageItems.lottery.game
    .period && nextPageItems.lottery.game.period ? nextPageItems.lottery.game.period : [],
  };
});

export function getNextPageAwardsAction(gameEn, lastPeriod) {
  return async (dispatch) => {
    dispatch(getNextPageAwards(gameEn, lastPeriod));
  };
}

