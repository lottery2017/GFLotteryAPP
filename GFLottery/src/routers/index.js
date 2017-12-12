import React, {Component} from "react";
import {StackNavigator, TabNavigator} from "react-navigation";
import HallStackNav from "../pages/hall/hall";
import HistoryStackNav from "../pages/history";
import DiscoverStackNav from "../pages/discover/discoverHall";
import MineStackNav from "../pages/Mine/mineHall";
const TabbarNavigator = TabNavigator({
    HallStackNav: { screen: HallStackNav },
    HistoryStackNav: { screen: HistoryStackNav },
    DiscoverStackNav: { screen: DiscoverStackNav },
    MineStackNav: { screen: MineStackNav }
}, {
    initialRouteName: 'HallStackNav',
    tabBarOptions: {
        activeTintColor: '#4BC1D2',
        inactiveTintColor: '#000',
        showIcon: true,
        showLabel: true,
        upperCaseLabel: false,
        pressColor: '#823453',
        pressOpacity: 0.8,
        style: {
            backgroundColor: '#fff',
            paddingBottom: 0,
            borderTopWidth: 0.5,
            borderTopColor: '#ccc',
        },
        labelStyle: {
            fontSize: 12,
            margin: 1
        },
        indicatorStyle: { height: 0 }, //android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    },
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    backBehavior: 'none',
});

const AppNavigator = StackNavigator({
    TabBar: {
        screen: TabbarNavigator,
        navigationOptions: {
            header: null
        }
    },
});

export {
    AppNavigator
};

