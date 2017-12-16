/**
 * Created by Ryan on 2017/12/16.
 */
import React, {Component} from 'react';
import {Image} from 'react-native';

export default class TabBarItem extends Component {

    render() {
        return (
            <Image source={ this.props.focused ? this.props.selectedImage : this.props.normalImage }
                   style={ {tintColor: this.props.tintColor, width: 25, height: 25} }
            />
        )
    }
}