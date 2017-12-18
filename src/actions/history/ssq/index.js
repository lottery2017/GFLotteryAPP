import { createAction } from 'redux-actions';
import { NativeModules } from 'react-native';
import * as types from '../../ActionTypes';
import * as SSQHistoryListService from '../../../service/history/ssq';
import * as helper from '../../../components/HistoryListHeader/helper';

export const refreshAction = createAction(types.SSQHISTORYLIST_REFRESHING);
export const clearDataAction = createAction(types.SSQHISTORYLIST_CLEARDATA);// 清空数据

// 获得最近的20条数据
export const getLatestTwentyAwards = createAction(types.SSQHISTORYLIST_REFRESHLIST,
async (gameEn,periodName) => {
  const latestTwentyItems = await SSQHistoryListService.getLatestTwentyAwards(gameEn, periodName);
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
export const getNextPageAwards = createAction(types.SSQHISTORYLIST_GETNEXTPAGE,
async (gameEn, lastPeriod) => {
  const nextPageItems = await SSQHistoryListService.getNextPageAwards(gameEn, lastPeriod);
  return {
    nextPageItems: nextPageItems && nextPageItems.lottery && nextPageItems.lottery
    .game.period && nextPageItems.lottery
    .game.period ? nextPageItems.lottery.game.period : [],
  };
});

export function getNextPageAwardsAction(gameEn, lastPeriod) {
  return async (dispatch) => {
    dispatch(getNextPageAwards(gameEn, lastPeriod));
  };
}

export const getHeaderLabelString = createAction(types.SSQHISTORYLIST_HEADERDISPLAY,
async (gameEn) => {
  const headerLabelString = await helper.headerLabelStringForGameEn(gameEn);
  return {
    headerLabelString: headerLabelString,
  };
});

// 获得列表头部展示的数据
export function getHeaderLabelStringAction(gameEn) {
  return async (dispatch) => {
    dispatch(getHeaderLabelString(gameEn));
  };
}
