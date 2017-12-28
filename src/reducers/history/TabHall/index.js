import Immutable from 'immutable';
import * as types from '../../../actions/ActionTypes';

const defaultUserState = Immutable.fromJS({
    initLoading: false,
    awardInfo: [],
    awardInfoNew: {},
    awardRankArray: [],
    isRefreshing:false,
});

export default function tabHistoryHall(state = defaultUserState, action) {
    switch (action.type) {
        case types.TABHISTORYHALLPAGE_REFRESHING:
            return state.merge({
                isRefreshing: true,
            });
        case types.TABHISTORYHALLPAGE_LOADING:
            return state.merge({
                initLoading: true,
            });
        case types.TABHISTORYHALLPAGE_GETAWARDHOME:
            return state.merge({
                awardInfo: action.payload.awardInfo,
                awardInfoNew: action.payload.awardInfoNew,
                gameEnArray: action.payload.gameEnArray,
                awardRankArray: action.payload.awardRankArray,
                initLoading: false,
                isRefreshing:false,
            });
        default:
            return state;
    }
}
