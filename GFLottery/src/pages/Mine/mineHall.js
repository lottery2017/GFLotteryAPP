/**
 * Created by PC on 2017/7/18.
 */
import React, {Component} from 'react';
import {Text, View} from "react-native";
export default class MineHall extends Component {
    static navigationOptions = {
        tabBarLabel: '我的',
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