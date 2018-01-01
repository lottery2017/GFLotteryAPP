import Immutable from "immutable";
import * as types from "../../../actions/ActionTypes";

const MAX_SAVE_PERIODS = 200; // 展示的最多条数
const defaultUserState = Immutable.Map({
    isRefreshing: false,
    isLoading: false,
    historyItems: [],
    hasNextPage: false,
    isEmpty: true,
});

export default function DLTHistoryList(state = defaultUserState, action) {
    switch (action.type) {
        case types.DLTHISTORYLIST_REFRESHING:
            return state.merge({
                isRefreshing: true,
            });
        case types.DLTHISTORYLIST_LOADING:
            return state.merge({
                isLoading: true,
            });
        case types.DLTHISTORYLIST_REFRESHLIST:
            return state.merge({
                isRefreshing: false,
                isLoading: false,
                historyItems: action.payload.latestTwentyItems,
                hasNextPage: action.payload.latestTwentyItems.length >= 20,
                isEmpty: action.payload.latestTwentyItems.length <= 0,
            });
        case types.DLTHISTORYLIST_GETNEXTPAGE:
            return state.merge({
                hasNextPage: action.payload.nextPageItems.length === 10 &&
                state.get('historyItems').size + action.payload.nextPageItems.length < MAX_SAVE_PERIODS,
                historyItems: action.payload.nextPageItems.length > 0 ?
                    state.get('historyItems').concat(Immutable.fromJS(action.payload.nextPageItems)) :
                    state.get('historyItems'),
                isRefreshing: false,
                isLoading: false,
            });
        case types.DLTHISTORYLIST_CLEARDATA:
            return Immutable.fromJS({
            });
        default:
            return state;
    }
}
