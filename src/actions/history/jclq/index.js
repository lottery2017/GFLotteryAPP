import {createAction} from "redux-actions";
import * as GlobalHelper from "../../../utils/GlobalHelper";
import * as types from "../../ActionTypes";
import getJCLQLatestDayAwards from "../../../service/history/jclq";

export const refreshAction = createAction(types.JCLQHISTORYLIST_REFRESHING);
export const loadingAction = createAction(types.JCLQHISTORYLIST_LOADING);
export const barDateClicked = createAction(types.JCLQHISTORYLIST_BARDATECLICKED);
export const datePickerViewDissapper = createAction(types.JCLQHISTORYLIST_DATEPICKERVIEWDISAPPER);
export const clearDataAction = createAction(types.JCLQHISTORYLIST_CLEARDATA);// 清空数据
// 获得最近3天的数据
export const getLatestDayAwards = createAction(types.JCLQHISTORYLIST_LATESTDAYLIST,
async (gameEn, date) => {
  const latest3DaysItems = [];
  const sectionsInfo = [];
    for (let i = 0; i < 3; i++) {
    const requestDate = new Date(date - (i * 24 * 60 * 60 * 1000));
    const data = await getJCLQLatestDayAwards(gameEn, `${requestDate.getFullYear()}-${GlobalHelper.getMonth(requestDate)}-${GlobalHelper.getDate(requestDate)}`);// eslint-disable-line no-await-in-loop
    if (data && data.awardMatchList && data.awardMatchList.length > 0 && data.selectedDate) {
      latest3DaysItems.push(
        { selectedDate: data.selectedDate, awardMatchList: data.awardMatchList });
      sectionsInfo.push(
        { selectedDate: data.selectedDate, matchNum: data.awardMatchList.length });
    }
  }
  return {
    latest3DaysItems: latest3DaysItems || [],
    requestDate: date,
    sectionsInfo: sectionsInfo,
  };
});

export function getLatestDayAwardsAction(gameEn, date) {
  return async (dispatch) => {
    dispatch(getLatestDayAwards(gameEn, date));
  };
}

export const getClickedSectionStatus = createAction(types.JCLQHISTORYLIST_SECTIONHEADERCLICKED,
async (sectionId, sectionStatus) => ({
  clickedSectionStatus: { sectionId: sectionId, sectionStatus: sectionStatus },
}));

export function sectionHeaderClickedAction(sectionId, sectionStatus) {
  return async (dispatch) => {
    dispatch(getClickedSectionStatus(sectionId, sectionStatus));
  };
}

