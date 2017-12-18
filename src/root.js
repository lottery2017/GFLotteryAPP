/**
 * App入口，将store注入Provider
 * Songlcy create by 2017-01-10
 * @flow
 */
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {addNavigationHelpers} from "react-navigation";
import {AppNavigator} from "./routers";
import getStore from "./store";

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

const mapStateToProps = (state) => ({
    nav: state.nav
});

class App extends Component {
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
