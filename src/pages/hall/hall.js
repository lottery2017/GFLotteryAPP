import React, {Component} from 'react';
import {Text, View} from "react-native";
import TabBarItem from "../../components/TabBarItem/TabBarItem";
export default class Hall extends Component {
    static navigationOptions = {
        tabBarIcon: ({focused, tintColor}) => (
            <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('../../images/TabBar_LotteryHall.png')}
                selectedImage={require('../../images/TabBar_LotteryHall_selected.png')}
            />
        )
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f2a0ff', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 50}}>
                    首页
                </Text>
            </View>
        );
    }
}