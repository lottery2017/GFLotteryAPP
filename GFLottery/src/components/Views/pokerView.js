import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import BaseComponent from '../Views/BaseComponent';
import PropTypes from 'prop-types';
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    width: 28.5,
    height: 36.5,
    backgroundColor: 'white',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  ball: { width: 31, height: 31, marginRight: 3.5, alignItems: 'center', justifyContent: 'center' },
  text: { backgroundColor: 'transparent', color: 'white', fontSize: 15 },
  image: { marginLeft: 5, width: 11, height: 11 },
});

export default class PokerView extends BaseComponent {

  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  valueColor() {
    const v = this.props.value.split('')[0];
    if (v === 1 || v === 3) {
      return 'black';
    }
    return '#E42440';
  }

  // AmericanTypewriter
  render() {
    const renderPattern = (value) => {
      const pattern = value.split('')[0];
      if (pattern === 2) {
        return <Image style={styles.image} resizeMode={'stretch'} source={require('../../../images/pk_poker_heart_trend.png')} />;
      } else if (pattern === 3) {
        return <Image style={styles.image} resizeMode={'stretch'} source={require('../../../images/pk_poker_club_trend.png')} />;
      } else if (pattern === 4) {
        return <Image style={styles.image} resizeMode={'stretch'} source={require('../../../images/pk_poker_diamond_trend.png')} />;
      }
      return <Image style={styles.image} resizeMode={'stretch'} source={require('../../../images/pk_poker_spade_trend.png')} />;
    };
    const renderNumber = (value) => {
      const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
      const v = value.split('');
      if (v[1] === 0) {
        return numbers[Number(v[2]) - 1];
      }
      return numbers[Number(v[1] + v[2]) - 1];
    };
    return (
      <View style={styles.wrapper}>
        <Text style={{ marginLeft: 5, fontFamily: 'americanTypewriter', fontSize: 14, color: this.valueColor() }}>{renderNumber(this.props.value)}</Text>
        {renderPattern(this.props.value)}
      </View>
    );
  }
}
