import { createAction } from 'redux-actions';
import { NativeModules } from 'react-native';
import * as types from '../../ActionTypes';
import * as DLTHistoryListService from '../../../service/history/dlt';
import * as helper from '../../../components/HistoryListHeader/helper';

export const refreshAction = createAction(types.DLTHISTORYLIST_REFRESHING);
export const loadingAction = createAction(types.DLTHISTORYLIST_LOADING);
export const clearDataAction = createAction(types.DLTHISTORYLIST_CLEARDATA);// 清空数据

// 获得最近的20条数据
export const getLatestTwentyAwards = createAction(types.DLTHISTORYLIST_REFRESHLIST,
 async (gameEn,periodName) => {
   const latestTwentyItems = await DLTHistoryListService.getLatestTwentyAwards(gameEn, periodName);
   return {
     latestTwentyItems: latestTwentyItems && latestTwentyItems
     .lottery && latestTwentyItems.lottery.game && latestTwentyItems.lottery.game.period ?
     latestTwentyItems.lottery.game.period : [],
   };
 });

export function getRefreshDataAction(gameEn,periodName) {
  return async (dispatch) => {
    dispatch(getLatestTwentyAwards(gameEn,periodName));
  };
}

// 获得下一页数据
export const getNextPageAwards = createAction(types.DLTHISTORYLIST_GETNEXTPAGE,
 async (gameEn, lastPeriod) => {
   const nextPageItems = await DLTHistoryListService.getNextPageAwards(gameEn, lastPeriod);
   return {
     nextPageItems: nextPageItems && nextPageItems.lottery && nextPageItems
     .lottery.game.period && nextPageItems.lottery.game.period ? nextPageItems.lottery
     .game.period : [],
   };
 });

export function getNextPageAwardsAction(gameEn, lastPeriod) {
  return async (dispatch) => {
    dispatch(getNextPageAwards(gameEn, lastPeriod));
  };
}

const getHeaderLabelString = createAction(types.DLTHISTORYLIST_HEADERDISPLAY,
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
