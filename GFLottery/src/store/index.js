/**
 * 创建Store,整合Provider
 */
import getReducers from './../reducers';
import {createStore, applyMiddleware} from 'redux';
import reduxPromiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';

const middlewares = [thunk];
// 开发环境输出日志
/*if (__DEV__) {
    const createLoggerMiddleware = require('redux-logger');
    middlewares.push(createLoggerMiddleware({
        stateTransformer(state) {
            return state;
        },
    }));
}*/
middlewares.push(reduxPromiseMiddleware);
export default function getStore(navReducer) {
    return createStore(
        getReducers(navReducer),
        undefined,
        applyMiddleware(...middlewares)
    );
}
