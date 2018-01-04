/**
 * App入口，将store注入Provider
 * Songlcy create by 2017-01-10
 * @flow
 */
import React, {Component} from "react";
import {BackHandler, ToastAndroid} from "react-native";
import {connect, Provider} from "react-redux";
import {addNavigationHelpers} from "react-navigation";
import {AppNavigator} from "./routers";
import getStore from "./store";
import codePush from 'react-native-code-push'
const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

const mapStateToProps = (state) => ({
    nav: state.nav
});

class App extends Component {
    componentWillMount() {
        //热更新
        codePush.sync();
        //热更新的策略
        codePush.InstallMode.ON_NEXT_RESTART;
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }

    _onBackAndroid = () => {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
// BackHandler.exitApp()
                return false
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按退出应用', ToastAndroid.SHORT);
            return true;
        }
    
    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = getStore(navReducer);
export default function Root() {
    return (
        <Provider
            store={store}>
            <AppWithNavigationState/>
        </Provider>
    );
}
