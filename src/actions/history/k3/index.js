import {createAction} from "redux-actions";
import * as types from "../../ActionTypes";
import * as K3HistoryListService from "../../../service/history/k3";

export const refreshAction = createAction(types.K3HISTORYLIST_REFRESHING);
export const loadingAction = createAction(types.K3HISTORYLIST_LOADING);
export const clearDataAction = createAction(types.K3HISTORYLIST_CLEARDATA);// 清空数据

// 获得最近的20条数据
export const getLatestTwentyAwards = createAction(types.K3HISTORYLIST_REFRESHLIST,
async (gameEn,periodName) => {
  const latestTwentyItems = await K3HistoryListService.getLatestTwentyAwards(gameEn, periodName);
  return {
    latestTwentyItems: latestTwentyItems && latestTwentyItems.lottery && latestTwentyItems
    .lottery.game && latestTwentyItems.lottery.game.period ? latestTwentyItems.lottery
    .game.period : [],
  };
});

export function getRefreshDataAction(gameEn,periodName) {
  return async (dispatch) => {
    dispatch(getLatestTwentyAwards(gameEn,periodName));
  };
}

// 获得下一页数据
export const getNextPageAwards = createAction(types.K3HISTORYLIST_GETNEXTPAGE,
async (gameEn, lastPeriod) => {
  const nextPageItems = await K3HistoryListService.getNextPageAwards(gameEn, lastPeriod);
  return {
    nextPageItems: nextPageItems && nextPageItems.lottery && nextPageItems.lottery
    .game.period && nextPageItems
    .lottery.game.period ? nextPageItems.lottery.game.period : [],
  };
});

export function getNextPageAwardsAction(gameEn, lastPeriod) {
  return async (dispatch) => {
    dispatch(getNextPageAwards(gameEn, lastPeriod));
  };
}

