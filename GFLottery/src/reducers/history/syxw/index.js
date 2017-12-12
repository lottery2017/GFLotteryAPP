import Immutable from 'immutable';

import * as types from '../../../actions/ActionTypes';

const MAX_SAVE_PERIODS = 200; // 展示的最多条数
const defaultUserState = Immutable.fromJS({
    isRefreshing: false,
    historyItems: [],
    hasNextPage: true,
    isEmpty: false,
});

export default function SYXWHistoryList(state = defaultUserState, action) {
    switch (action.type) {
        case types.SYXWHISTORYLIST_REFRESHING:
            return state.merge({
                isRefreshing: true,
            });
        case types.SYXWHISTORYLIST_REFRESHLIST:
            return state.merge({
                isRefreshing: false,
                historyItems: action.payload.latestTwentyItems,
                hasNextPage: action.payload.latestTwentyItems.length >= 20,
                isEmpty: action.payload.latestTwentyItems.length <= 0,
            });
        case types.SYXWHISTORYLIST_GETNEXTPAGE:
            return state.merge({
                isRefreshing: false,
                hasNextPage: action.payload.nextPageItems.length === 10 &&
                state.get('historyItems').size + action.payload.nextPageItems.length < MAX_SAVE_PERIODS,
                historyItems: action.payload.nextPageItems.length > 0 ?
                    state.get('historyItems').concat(Immutable.fromJS(action.payload.nextPageItems)) :
                    state.get('historyItems'),
            });
        case types.SYXWHISTORYLIST_CLEARDATA:
            return Immutable.fromJS({
            });
        default:
            return state;
    }
}
