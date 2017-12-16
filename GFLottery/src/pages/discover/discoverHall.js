/**
 * Created by PC on 2017/7/18.
 */
import React, {Component} from 'react';
import {Text, View} from "react-native";
import TabBarItem from "../../components/TabBarItem/TabBarItem";
export default class DiscoverHall extends Component {
    static navigationOptions = {
        tabBarLabel: '发现',
        tabBarIcon: ({focused, tintColor}) => (
            <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('../../images/TabBar_Discovery.png')}
                selectedImage={require('../../images/TabBar_Discovery_selected.png')}
            />
        )
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