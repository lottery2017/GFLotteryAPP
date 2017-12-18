import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  NativeModules,
  TouchableOpacity,
  Dimensions,
    ImageBackground
} from 'react-native';
import * as helper from './helper';
import BaseComponent from '../Views/BaseComponent';
import PropTypes from 'prop-types';
const SCREEN_WIDTH = Dimensions.get('window').width;
const X_SCALE = SCREEN_WIDTH / 320.0;
const LINE_HEIGHT = 1;
const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  ball: { width: 31 * X_SCALE, height: 31 * X_SCALE, marginRight: 3.5, alignItems: 'center', justifyContent: 'center' },
  text: { backgroundColor: 'transparent', color: 'white', fontSize: 18 },
  nonFirstRowtext: { backgroundColor: 'transparent', color: 'red', fontSize: 18 },
});

export default class X3DCell extends BaseComponent {
  static propTypes = {
    extra: PropTypes.string,
    gameEn: PropTypes.string,
    awardNo: PropTypes.string,
    awardTime: PropTypes.string,
    periodName: PropTypes.string,
    cellStyle: PropTypes.oneOf(['tabHall', 'historyList', 'detail']).isRequired,
    // 列表页需要
    row: PropTypes.string,
    rowData: PropTypes.object,
  };
  static defaultProps = {
    awardNo: '',
    awardTime: '',
    periodName: '',
    extra: '',
    gameEn: 'x3d',
    // 列表页需要
    row: '',
    rowData: null,
  }
  render() {
    const getPeriodString = (awardTime, periodName) => {
      if (awardTime && periodName) {
        return helper.getSimplePeriodSting(awardTime, periodName);
      }
      return '';
    };
    const getAwardNoArray = (awardNo) => {
      const numbers = awardNo.split(' ');
      return numbers;
    };
    if (this.props.cellStyle === 'tabHall') {
      if (this.props.awardNo) {
        const awardNoArr = getAwardNoArray(this.props.awardNo);
        const route = () => {
          NativeModules.LDRNBridge.routeWithURL('reactnative',
            { moduleName: 'X3DHistoryList', showStyle: 'push', hideTabbar: true, properties: { gameEn: 'x3d' } });
        };
        return (
          <TouchableOpacity activeOpacity={1.0} onPress={this.props.onPress} style={{ height: 87 * X_SCALE, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ height: 87 * X_SCALE, justifyContent: 'space-between' }}>
              <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginLeft: 15, fontSize: 16 }}>{'3D'}</Text>
                <Text style={{ marginLeft: 5, fontSize: 12, color: '#aaaaaa' }}>{getPeriodString(this.props.awardTime, this.props.periodName)}</Text>
              </View>
              <View style={{ marginLeft: 15, marginBottom: 10 * X_SCALE, flexDirection: 'row', alignItems: 'center' }}>
                {awardNoArr.map((number, index) => {
                  const key = `${number} ${index}`;
                  return (
                    <ImageBackground key={key} style={styles.ball} source={require('../../../images/redBall.png')}>
                      <Text style={styles.text}>{number}</Text>
                    </ImageBackground>
                  );
                })
                }
                <Text style={{ marginLeft: 10 }}>{`试机号:${this.props.extra}`}</Text>
              </View>
            </View>
            <Image style={{ marginRight: 15 }} source={require('../../../images/historyCellArrow.png')} />
          </TouchableOpacity>
        );
      }
      return (
        <View style={{ height: 87 * X_SCALE, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ height: 87 * X_SCALE, justifyContent: 'space-between' }}>
            <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginLeft: 15, fontSize: 16 }}>{'3D'}</Text>
              <Text style={{ marginLeft: 5, fontSize: 12, color: '#aaaaaa' }}>{getPeriodString(this.props.awardTime, this.props.periodName)}</Text>
            </View>
            <View style={{ marginLeft: 15, marginBottom: 20 * X_SCALE, flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, color: '#ADADAD' }}>暂无开奖信息</Text>
            </View>
          </View>
        </View>
      );
    } else if (this.props.cellStyle === 'historyList') {
      const route = () => {
        NativeModules.LDRNBridge.routeWithURL('awardDetailsList', { gameEn: this.props.gameEn, awardNo: this.props.rowData.awardNo, awardTime: this.props.rowData.awardTime, period: this.props.rowData.periodName, luckyBlue: this.props.rowData.luckyBlue, extra: this.props.rowData.extra });
      };
      const awardNoArr = getAwardNoArray(this.props.rowData.awardNo);
      const numBGImage = this.props.row === '0' ? require('../../../images/redBall.png') : require('../../../images/transparencyBall.png');
      const textStyle = this.props.row === '0' ? styles.text : styles.nonFirstRowtext;
      return (
        <View style={{ backgroundColor: 'white', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={1.0} onPress={route} style={{ height: 87 * X_SCALE, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ height: 87 * X_SCALE, justifyContent: 'space-between' }}>
              <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginLeft: 5, fontSize: 12, color: '#aaaaaa' }}>{getPeriodString(this.props.rowData.awardTime, this.props.rowData.periodName)}</Text>
              </View>
              <View style={{ marginLeft: 15, marginBottom: 10 * X_SCALE, flexDirection: 'row', alignItems: 'center' }}>
                {awardNoArr.map((number, index) => {
                  const key = `${number} ${index}`;
                  return (
                    <ImageBackground key={key} style={styles.ball} source={numBGImage}>
                      <Text style={textStyle}>{number}</Text>
                    </ImageBackground>
                  );
                })
                }
                <Text style={{ marginLeft: 10 }}>{`试机号:${this.props.rowData.extra}`}</Text>
              </View>
            </View>
            <Image style={{ marginRight: 15 }} source={require('../../../images/historyCellArrow.png')} />
          </TouchableOpacity>
          <View style={{ height: LINE_HEIGHT, width: SCREEN_WIDTH, backgroundColor: '#ececec' }} />
        </View>
      );
    }
    return null;
  }
}
