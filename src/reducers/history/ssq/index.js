import Immutable from 'immutable';

import * as types from '../../../actions/ActionTypes';

const MAX_SAVE_PERIODS = 200; // 展示的最多条数
const defaultUserState = Immutable.fromJS({
    isRefreshing: false,
    historyItems: [],
    headerLabelString: '',
    hasNextPage: true,
    isEmpty: false,
    isLoading:false,
});

export default function SSQHistoryList(state = defaultUserState, action) {
    switch (action.type) {
        case types.SSQHISTORYLIST_REFRESHING:
            return state.merge({
                isRefreshing: true,
            });
        case types.SSQHISTORYLIST_LOADING:
            return state.merge({
                isLoading: true,
            });
        case types.SSQHISTORYLIST_REFRESHLIST:
            return state.merge({
                isRefreshing: false,
                isLoading: false,
                historyItems: action.payload.latestTwentyItems,
                hasNextPage: action.payload.latestTwentyItems.length >= 20,
                isEmpty: action.payload.latestTwentyItems.length <= 0,
            });
        case types.SSQHISTORYLIST_GETNEXTPAGE:
            return state.merge({
                isRefreshing: false,
                isLoading: false,
                hasNextPage: action.payload.nextPageItems.length === 10 &&
                state.get('historyItems').size + action.payload.nextPageItems.length < MAX_SAVE_PERIODS,
                historyItems: action.payload.nextPageItems.length > 0 ?
                    state.get('historyItems').concat(Immutable.fromJS(action.payload.nextPageItems)) :
                    state.get('historyItems'),
            });
        case types.SSQHISTORYLIST_HEADERDISPLAY:
            return state.merge({
                headerLabelString: action.payload.headerLabelString,
            });
        case types.SSQHISTORYLIST_CLEARDATA:
            return Immutable.fromJS({
            });
        default:
            return state;
    }
}
