/**
 * Created by Ryan on 2018/1/1.
 * 折叠View
 */
import React, {Component} from "react";
import {Animated, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
import * as GlobalConstants from "../../utils/GlobalConstants";
const ICONS = {
    up: require('../../../images/roundGrayUpArrow.png'),
    down: require('../../../images/roundGrayDownArrow.png')
}

export default class CollapsableView extends Component {
    static propTypes = {
        expanded: PropTypes.bool,
        title: PropTypes.string,
        onToggle: PropTypes.func
    }

    static defaultProps = {
        expanded: true
    }

    constructor(props) {
        super(props)

        this.state = {
            expanded: props.expanded,
            animation: new Animated.Value()
        }
    }

    toggle = () => {
        const {onToggle} = this.props
        const {expanded, maxHeight, minHeight, animation} = this.state
        const initialValue = expanded ? minHeight + maxHeight : minHeight
        const finalValue = expanded ? minHeight : minHeight + maxHeight

        this.setState({expanded: !expanded})
        animation.setValue(initialValue)

        Animated.timing(animation, {
            toValue: finalValue
        }).start()

        //onToggle()
    }

    render() {
        const {expanded, animation, maxHeight} = this.state;
        const icon = expanded ? 'up' : 'down';
        return (
            <Animated.View style={[styles.container, {height: animation}]}>
                <TouchableOpacity style={styles.touchableWithoutFeedback_view} onPress={this.toggle}
                                  activeOpacity={1}
                                  onLayout={event => this.setState({minHeight: event.nativeEvent.layout.height})}
                >
                    <Text style={styles.titleText}>
                        {this.props.text}
                    </Text>
                    <View style={styles.arrowView}>
                        <Image style={styles.buttonImage} source={ICONS[icon]}/>
                    </View>
                </TouchableOpacity>
                {/*fixed bug in recent version of react-native that maxHeight will be changed when body is collapsed*/}
                <View onLayout={event => !maxHeight && this.setState({maxHeight: event.nativeEvent.layout.height})}>
                    {this.props.children}
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        overflow: 'hidden'
    },
    titleContainer: {
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        padding: 10,
        color: '#2a2f43',
        fontWeight: 'bold'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonImage: {
        width: 15,
        height: 15,
    },
    body: {}, rootTouchableWithoutFeedback: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 29,
        backgroundColor: 'white',
    },
    touchableWithoutFeedback_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 30,
    },
    titleText: {
        color: '#3c3e45',
        fontSize: 14,
    },
    arrowView: {
        position: 'absolute',
        right: 23,
    },
});