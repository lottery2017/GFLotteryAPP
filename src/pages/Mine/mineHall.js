/**
 * Created by PC on 2017/7/18.
 */
import React, {Component} from 'react';
import {Text, View} from "react-native";
import TabBarItem from "../../components/TabBarItem/TabBarItem";
export default class MineHall extends Component {
    static navigationOptions = {
        tabBarIcon: ({focused, tintColor}) => (
            <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('../../images/TabBar_MyLottery.png')}
                selectedImage={require('../../images/TabBar_MyLottery_selected.png')}
            />
        )

    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#9de2ff', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 50}}>
                    我的
                </Text>
            </View>
        );
    }
}