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
import codePush from "react-native-code-push";
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
        this.codePushUpdate();
        //热更新的策略
        codePush.InstallMode.ON_NEXT_RESTART;
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }

    codePushUpdate() {
        codePush.sync({
                installMode: codePush.InstallMode.IMMEDIATE,
                updateDialog: true
            },
            (status) => {
                switch (status) {
                    case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                        console.log('codePush.SyncStatus.CHECKING_FOR_UPDATE');
                        break;
                    case codePush.SyncStatus.AWAITING_USER_ACTION:
                        console.log('codePush.SyncStatus.AWAITING_USER_ACTION');
                        break;
                    case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                        console.log('codePush.SyncStatus.DOWNLOADING_PACKAGE');
                        break;
                    case codePush.SyncStatus.INSTALLING_UPDATE:
                        console.log('codePush.SyncStatus.INSTALLING_UPDATE');
                        break;
                    case codePush.SyncStatus.UP_TO_DATE:
                        console.log('codePush.SyncStatus.UP_TO_DATE');
                        break;
                    case codePush.SyncStatus.UPDATE_IGNORED:
                        console.log('codePush.SyncStatus.UPDATE_IGNORED');
                        break;
                    case codePush.SyncStatus.UPDATE_INSTALLED:
                        console.log('codePush.SyncStatus.UPDATE_INSTALLED');
                        break;
                    case codePush.SyncStatus.SYNC_IN_PROGRESS:
                        console.log('codePush.SyncStatus.SYNC_IN_PROGRESS');
                        break;
                    case codePush.SyncStatus.UNKNOWN_ERROR:
                        console.log('codePush.SyncStatus.UNKNOWN_ERROR');
                        break;
                }
            },
            ({receivedBytes, totalBytes,}) => {
                console.log('receivedBytes / totalBytes: ------------    ' + receivedBytes + '/' + totalBytes);
            }
        );
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
