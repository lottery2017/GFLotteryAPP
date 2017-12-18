import React, {Component} from "react";
import {StackNavigator, TabNavigator} from "react-navigation";
import HallStackNav from "../pages/hall/hall";
import HistoryStackNav from "../pages/history";
import DiscoverStackNav from "../pages/discover/discoverHall";
import MineStackNav from "../pages/Mine/mineHall";
//双色球
import SSQHistoryList from '../pages/history/ssq';
//大乐透
import DLTHistoryList from '../pages/history/dlt';
//十一选五
import SYXWHistoryList from '../pages/history/syxw';
//时时彩
import SSCHistoryList from '../pages/history/ssc';
//3D
import X3DHistoryList from '../pages/history/x3d';
//快3
import K3HistoryList from '../pages/history/k3';
//胜负彩
import SFCHistoryList from '../pages/history/sfc';
//竞彩足球
import JCZQHistoryList from '../pages/history/jczq';
//竞彩篮球
import JCLQHistoryList from '../pages/history/jclq';
const TabbarNavigator = TabNavigator({
    HallStackNav: {screen: HallStackNav},
    HistoryStackNav: {screen: HistoryStackNav},
    DiscoverStackNav: {screen: DiscoverStackNav},
    MineStackNav: {screen: MineStackNav}
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
        showLabel:false,
        style: {
            height:49 ,
        },
        labelStyle: {
            fontSize: 12,
            margin: 1
        },
        indicatorStyle: {height: 0}, //android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    },
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: false,
    lazy: true,
    backBehavior: 'none',
});

const AppNavigator = StackNavigator({
    TabBar: {
        screen: TabbarNavigator,
        navigationOptions: {
            header: null
        }
    }, SSQHistoryList: {
        screen: SSQHistoryList,
        navigationOptions: {
            title: '双色球',
        }
    }, DLTHistoryList: {
        screen: DLTHistoryList,
        navigationOptions: {
            title: '大乐透',
        }
    }, SYXWHistoryList: {
        screen: SYXWHistoryList,//十一选五
    }, SSCHistoryList: {
        screen: SSCHistoryList,//时时彩
    }, X3DHistoryList: {
        screen: X3DHistoryList,//3D
        navigationOptions: {
            title: '3D',
        }
    }, K3HistoryList: {
        screen: K3HistoryList,//快3
    }, SFCHistoryList: {
        screen: SFCHistoryList,//胜负彩
        navigationOptions: {
            title: '胜负彩',
        }
    },JCZQHistoryList:{
        screen:JCZQHistoryList,
        navigationOptions: {
            title: '竞彩足球',
        }
    },JCLQHistoryList:{
        screen:JCLQHistoryList,
        navigationOptions: {
            title: '竞彩篮球',
        }
    },


});

export {
    AppNavigator
};

