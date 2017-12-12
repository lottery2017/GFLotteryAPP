import {combineReducers} from 'redux';
import DLTHistoryListReducer from './history/dlt';
import JCLQHistoryListReducer from './history/jclq';
import JCZQHistoryListReducer from './history/jczq';
import K3HistoryListReducer from './history/k3';
import SFCHistoryListReducer from './history/sfc';
import SSCHistoryListReducer from './history/ssc';
import SSQHistoryListReducer from './history/ssq';
import SYXWHistoryListReducer from './history/syxw';
import tabHistoryHallReducer from './history/TabHall';
import X3DHistoryListReducer from './history/x3d';
export default function getReducers(navReducer) {
    return combineReducers({
        tabHistoryHallReducer,
        DLTHistoryListReducer,
        JCLQHistoryListReducer,
        JCZQHistoryListReducer,
        K3HistoryListReducer,
        SFCHistoryListReducer,
        SSCHistoryListReducer,
        SSQHistoryListReducer,
        SYXWHistoryListReducer,
        X3DHistoryListReducer,
        nav: navReducer
    });
}
