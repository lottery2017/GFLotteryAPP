import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";

const styles = StyleSheet.create({
  touchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 79,
    height: 29,
  },
  image: {
    width: 15,
    height: 14,
    marginRight: 5,
  },
  text: {
    color: 'white',
    fontSize: 17.0,
    width: 38,
  },
});

export default class JCHistoryListBarDateView extends React.Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={1} style={styles.touchableOpacity} onPress={this.props.onPress}>
              <Image style={styles.image} source={require('../../../images/JCZQHistoryListBarDate.png')}/>
              <Text style={styles.text}>
                日期
              </Text>
            </TouchableOpacity>
        );
    }

}

