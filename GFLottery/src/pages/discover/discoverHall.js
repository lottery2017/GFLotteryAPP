/**
 * Created by PC on 2017/7/18.
 */
import React, {Component} from 'react';
import {Text, View} from "react-native";
export default class DiscoverHall extends Component {
    static navigationOptions = {
        tabBarLabel: '发现',
    };
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#c6ff97', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 50}}>
                    发现
                </Text>
            </View>
        );
    }
}