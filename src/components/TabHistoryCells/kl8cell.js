import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import * as helper from './helper';
import PropTypes from 'prop-types';
import BaseComponent from '../Views/BaseComponent';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  text: { width: 20, marginRight: 5, backgroundColor: 'transparent', color: '#E42440', fontSize: 15 },
});

const SCREEN_WIDTH = Dimensions.get('window').width;
const X_SCALE = SCREEN_WIDTH / 320.0;

export default class KL8Cell extends BaseComponent {
  static propTypes = {
    awardNo: PropTypes.string,
    awardTime: PropTypes.string,
    periodName: PropTypes.string,
  };
  static defaultProps = {
    awardNo: '',
    awardTime: '',
    periodName: '',
  }
  constructor(props) {
    super(props);
    const getAwardNoArray = (awardNo) => {
      const numberStrings = awardNo.split(':')[0];
      const numbers = numberStrings.split(' ');
      return numbers;
    };
    const getAwardDescription = (awardNo) => {
      const number = awardNo.split(':')[1];
      return `飞盘x ${number}`;
    };
    const getPeriodString = (awardTime, periodName) => {
      if (awardTime && periodName) {
        return helper.getPeriodTimeString(awardTime, periodName);
      }
      return '';
    };
    this.state = {
      awardNoArray: props.awardNo ? getAwardNoArray(props.awardNo) : [],
      periodSting: props.awardTime && props.periodName ? getPeriodString(props.awardTime, props.periodName) : '',
      descString: props.awardNo ? getAwardDescription(props.awardNo) : '',
    };
  }
  render() {
    if (this.props.awardNo) {
      return (
        <View style={{ height: 87 * X_SCALE, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ height: 87 * X_SCALE, justifyContent: 'space-between' }}>
            <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginLeft: 15, fontSize: 16 }}>快乐8</Text>
              <Text style={{ marginLeft: 5, fontSize: 12, color: '#aaaaaa' }}>{this.state.periodSting}</Text>
            </View>
            <View style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
              {this.state.awardNoArray.slice(0, 9).map((number, index) => {
                const key = `${number} ${index}`;
                return (
                  <Text key={key} style={styles.text}>{number}</Text>
                );
              })}
            </View>
            <View style={{ marginLeft: 15, marginBottom: 10 * X_SCALE, flexDirection: 'row', alignItems: 'center' }}>
              {this.state.awardNoArray.slice(10).map((number, index) => {
                const key = `${number} ${index}`;
                return (
                  <Text key={key} style={styles.text}>{number}</Text>
                );
              })}
              <Text style={{ marginLeft: 10 }}>{this.state.descString}</Text>
            </View>
          </View>
          <Image style={{ marginRight: 15 }} source={require('../../../images/historyCellArrow.png')} />
        </View>
      );
    }
    return (
      <View style={{ height: 87 * X_SCALE, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ height: 87 * X_SCALE, justifyContent: 'space-between' }}>
          <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginLeft: 15, fontSize: 16 }}>快乐8</Text>
            <Text style={{ marginLeft: 5, fontSize: 12, color: '#aaaaaa' }}>{this.state.periodSting}</Text>
          </View>
          <View style={{ marginLeft: 15, marginBottom: 20 * X_SCALE, flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, color: '#ADADAD' }}>暂无开奖信息</Text>
          </View>
        </View>
      </View>
    );
  }
}
