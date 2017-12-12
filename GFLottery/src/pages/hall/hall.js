import React, {Component} from 'react';
import {Text, View} from "react-native";
export default class Hall extends Component {
    static navigationOptions = {
        tabBarLabel: '首页',
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