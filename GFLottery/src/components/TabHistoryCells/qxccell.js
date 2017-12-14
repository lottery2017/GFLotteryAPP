import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
    ImageBackground
} from 'react-native';
import * as helper from './helper';
import BaseComponent from '../Views/BaseComponent';
import PropTypes from 'prop-types';
const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  ball: { width: 31, height: 31, marginRight: 3.5, alignItems: 'center', justifyContent: 'center' },
  text: { backgroundColor: 'transparent', color: 'white', fontSize: 15 },
});

const SCREEN_WIDTH = Dimensions.get('window').width;
const X_SCALE = SCREEN_WIDTH / 320.0;

export default class QXCCell extends BaseComponent {
  static propTypes = {
    awardNo: PropTypes.string,
    awardTime: PropTypes.string,
    periodName: PropTypes.string,
  };
  static defaultProps = {
    awardNo: '',
    awardTime: '',
    periodName: '',
  };
  constructor(props) {
    super(props);
    const getAwardNoArray = (awardNo) => {
      const numbers = awardNo.split(' ');
      return numbers;
    };
    this.state = {
      awardNoArray: props.awardNo ? getAwardNoArray(props.awardNo) : [],
      periodSting: (props.awardTime && props.periodName) ? helper.getPeriodString(props.awardTime, props.periodName) : '',
    };
  }
  render() {
    if (this.props.awardNo) {
      return (
        <View style={{ height: 87 * X_SCALE, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ height: 87 * X_SCALE, justifyContent: 'space-between' }}>
            <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginLeft: 15, fontSize: 16 }}>七星彩</Text>
              <Text style={{ marginLeft: 5, fontSize: 12, color: '#aaaaaa' }}>{this.state.periodSting}</Text>
            </View>
            <View style={{ marginLeft: 15, marginBottom: 10 * X_SCALE, flexDirection: 'row' }}>
              {this.state.awardNoArray.map((number, index) => {
                const key = `${number} ${index}`;
                return (
                  <ImageBackground key={key} style={styles.ball} source={require('../../../images/redBall.png')}>
                    <Text style={styles.text}>{number}</Text>
                  </ImageBackground>
                );
              })}
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
            <Text style={{ marginLeft: 15, fontSize: 16 }}>七星彩</Text>
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
