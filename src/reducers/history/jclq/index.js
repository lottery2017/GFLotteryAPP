import Immutable from 'immutable';
import * as types from '../../../actions/ActionTypes';

const defaultUserState = Immutable.fromJS({
    datePickerShow: false,
    isRefreshing: false,
    lastest3DaysItems: [], // 二维数组，做多存放最近三天的数据
    requestDate: new Date(),
    sectionsStatus: {},
    resetHeader: false,
    sectionsInfo: [],
    isEmpty: false,
});

export default function JCLQHistoryList(state = defaultUserState, action) {
    switch (action.type) {
        case types.JCLQHISTORYLIST_REFRESHING:
            return state.merge({
                isRefreshing: true,
            });
        case types.JCLQHISTORYLIST_BARDATECLICKED:
            return state.merge({
                datePickerShow: true,
                resetHeader: false,
            });
        case types.JCLQHISTORYLIST_DATEPICKERVIEWDISAPPER:
            return state.merge({
                datePickerShow: false,
                resetHeader: false,
            });
        case types.JCLQHISTORYLIST_LATESTDAYLIST:
            return state.merge({
                lastest3DaysItems: action.payload.latest3DaysItems,
                requestDate: action.payload.requestDate,
                isRefreshing: false,
                sectionsStatus: {},
                resetHeader: true,
                sectionsInfo: action.payload.sectionsInfo,
                isEmpty: action.payload.latest3DaysItems.length <= 0,
            });
        case types.JCLQHISTORYLIST_SECTIONHEADERCLICKED:
            return state.mergeDeep({
                sectionsStatus: Object.assign({}, state.sectionsStatus, {
                    [action.payload.clickedSectionStatus.sectionId]:
                    action.payload.clickedSectionStatus.sectionStatus,
                }),
                resetHeader: false,
            });
        case types.JCLQHISTORYLIST_CLEARDATA:
            return Immutable.Map({
            });
        default:
            return state;
    }
}
