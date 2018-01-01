import Immutable from "immutable";
import * as types from "../../../actions/ActionTypes";

const defaultUserState = Immutable.fromJS({
    datePickerShow: false,
    isRefreshing: false,
    isLoading: false,
    lastest3DaysItems: [], // 二维数组，做多存放最近三天的数据
    requestDate: new Date(),
    sectionsStatus: {},
    resetHeader: false,
    sectionsInfo: [],
    isEmpty: false,
});

export default function JCZQHistoryList(state = defaultUserState, action) {
    switch (action.type) {
        case types.JCZQHISTORYLIST_REFRESHING:
            return state.merge({
                isRefreshing: true,
            });
        case types.JCZQHISTORYLIST_LOADING:
            return state.merge({
                isLoading: true,
            });
        case types.JCZQHISTORYLIST_BARDATECLICKED:
            return state.merge({
                datePickerShow: true,
                resetHeader: false,
            });
        case types.JCZQHISTORYLIST_DATEPICKERVIEWDISAPPER:
            return state.merge({
                datePickerShow: false,
                resetHeader: false,
            });
        case types.JCZQHISTORYLIST_LATESTDAYLIST:
            return state.merge({
                lastest3DaysItems: action.payload.latest3DaysItems,
                requestDate: action.payload.requestDate,
                isRefreshing: false,
                isLoading: false,
                sectionsStatus: {},
                resetHeader: true,
                sectionsInfo: action.payload.sectionsInfo,
                isEmpty: action.payload.latest3DaysItems.length <= 0,
            });
        case types.JCZQHISTORYLIST_SECTIONHEADERCLICKED:
            return state.mergeDeep({
                sectionsStatus: Object.assign({}, state.sectionsStatus, {
                    [action.payload.clickedSectionStatus.sectionId]:
                    action.payload.clickedSectionStatus.sectionStatus,
                }),
                resetHeader: false,
            });
        case types.JCZQHISTORYLIST_CLEARDATA:
            return Immutable.fromJS({
            });
        default:
            return state;
    }
}
