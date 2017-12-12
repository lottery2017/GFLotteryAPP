import Immutable from 'immutable';
import * as types from '../../../actions/ActionTypes';

const defaultUserState = Immutable.fromJS({
    isRefreshing: false,
    awardInfo: [],
    awardInfoNew: {},
    awardRankArray: [],
});

export default function tabHistoryHall(state = defaultUserState, action) {
    switch (action.type) {
        case types.TABHISTORYHALLPAGE_REFRESHING:
            return state.merge({
                isRefreshing: true,
            });
        case types.TABHISTORYHALLPAGE_GETAWARDHOME:
            return state.merge({
                awardInfo: action.payload.awardInfo,
                awardInfoNew: action.payload.awardInfoNew,
                gameEnArray: action.payload.gameEnArray,
                awardRankArray: action.payload.awardRankArray,
                isRefreshing: false,
            });
        default:
            return state;
    }
}
