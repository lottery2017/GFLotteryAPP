import {createAction} from 'redux-actions';
import * as GlobalHelper from '../../../utils/GlobalHelper';
import * as types from '../../ActionTypes';
import getJCZQLatestDayAwards from '../../../service/history/jczq';

export const refreshAction = createAction(types.JCZQHISTORYLIST_REFRESHING);
export const loadingAction = createAction(types.JCZQHISTORYLIST_LOADING);
export const barDateClicked = createAction(types.JCZQHISTORYLIST_BARDATECLICKED);
export const datePickerViewDissapper = createAction(types.JCZQHISTORYLIST_DATEPICKERVIEWDISAPPER);
export const clearDataAction = createAction(types.JCZQHISTORYLIST_CLEARDATA);// 清空数据

// 获得最近3天的数据
export const getLatestDayAwards = createAction(types.JCZQHISTORYLIST_LATESTDAYLIST,
    async (gameEn, date) => {
        const latest3DaysItems = [];
        const sectionsInfo = [];
        for (let i = 0; i < 3; i += 1) {
            const requestDate = new Date(date - (i * 24 * 60 * 60 * 1000));
            const data = await getJCZQLatestDayAwards(gameEn, `${requestDate.getFullYear()}-${GlobalHelper.getMonth(requestDate)}-${GlobalHelper.getDate(requestDate)}`);// eslint-disable-line no-await-in-loop
            if (data && data.awardMatchList && data.awardMatchList.length > 0 && data.selectedDate) {
                latest3DaysItems.push(
                    {selectedDate: data.selectedDate, awardMatchList: data.awardMatchList});
                sectionsInfo.push({selectedDate: data.selectedDate, matchNum: data.awardMatchList.length});
            }
        }
        return {
            latest3DaysItems: latest3DaysItems,
            requestDate: date,
            sectionsInfo: sectionsInfo,
        };
    });


export const getClickedSectionStatus = createAction(types.JCZQHISTORYLIST_SECTIONHEADERCLICKED,
    async (sectionId, sectionStatus) => ({
        clickedSectionStatus: {sectionId: sectionId, sectionStatus: sectionStatus},
    }));

export function sectionHeaderClickedAction(sectionId, sectionStatus) {
    return async (dispatch) => {
        dispatch(getClickedSectionStatus(sectionId, sectionStatus));
    };
}

export function getLatestDayAwardsAction(gameEn, date) {
    return async (dispatch) => {
        dispatch(getLatestDayAwards(gameEn, date));
    };
}

