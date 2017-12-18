import { createAction } from 'redux-actions';
import { NativeModules } from 'react-native';
import * as types from '../../ActionTypes';
import * as X3DHistoryListService from '../../../service/history/x3d';
import * as helper from '../../../components/HistoryListHeader/helper';

export const refreshAction = createAction(types.X3DHISTORYLIST_REFRESHING);
export const clearDataAction = createAction(types.X3DHISTORYLIST_CLEARDATA);// 清空数据

// 获得最近的20条数据
export const getLatestTwentyAwards = createAction(types.X3DHISTORYLIST_REFRESHLIST,
 async (gameEn,periodName) => {
   const latestTwentyItems = await X3DHistoryListService.getLatestTwentyAwards(gameEn, periodName);
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
export const getNextPageAwards = createAction(types.X3DHISTORYLIST_GETNEXTPAGE,
 async (gameEn, lastPeriod) => {
   const nextPageItems = await X3DHistoryListService.getNextPageAwards(gameEn, lastPeriod);
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

const getHeaderLabelString = createAction(types.X3DHISTORYLIST_HEADERDISPLAY,
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
