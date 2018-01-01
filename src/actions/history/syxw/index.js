import  { createAction } from 'redux-actions';
import { NativeModules } from 'react-native';
import * as types from '../../ActionTypes';
import * as SYXWHistoryListService from '../../../service/history/syxw';


export const refreshAction = createAction(types.SYXWHISTORYLIST_REFRESHING);
export const loadingAction = createAction(types.SYXWHISTORYLIST_LOADING);
export const clearDataAction = createAction(types.SYXWHISTORYLIST_CLEARDATA);// 清空数据

// 获得最近的20条数据
export const getLatestTwentyAwards = createAction(types.SYXWHISTORYLIST_REFRESHLIST,
async (gameEn,periodName) => {
  const latestTwentyItems = await SYXWHistoryListService.getLatestTwentyAwards(gameEn, periodName);
  return {
    latestTwentyItems: latestTwentyItems && latestTwentyItems.lottery && latestTwentyItems.lottery
    .game && latestTwentyItems.lottery.game.period ? latestTwentyItems.lottery.game.period : [],
  };
});

export function getRefreshDataAction(gameEn,periodName) {
  return async (dispatch) => {
    dispatch(getLatestTwentyAwards(gameEn,periodName));
  };
}

// 获得下一页数据
export const getNextPageAwards = createAction(types.SYXWHISTORYLIST_GETNEXTPAGE,
async (gameEn, lastPeriod) => {
  const nextPageItems = await SYXWHistoryListService.getNextPageAwards(gameEn, lastPeriod);
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
