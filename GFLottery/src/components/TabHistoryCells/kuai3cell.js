import React from 'react';
import {
  View,
  Text,
  Image,
  NativeModules,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
    ImageBackground
} from 'react-native';
import * as GlobalHelper from '../../utils/GlobalHelper';
import * as helper from './helper';
import BaseComponent from '../Views/BaseComponent';
import PropTypes from 'prop-types';
const SCREEN_WIDTH = Dimensions.get('window').width;
const X_SCALE = SCREEN_WIDTH / 320.0;
const LINE_HEIGHT = 1;
const styles = StyleSheet.create({
  redText: { marginLeft: 25, backgroundColor: 'transparent', color: 'red', fontSize: 18 },
});
export default class KUAI3Cell extends BaseComponent {

  static propTypes = {
    cellStyle: PropTypes.oneOf(['tabHall', 'historyList', 'detail']).isRequired,
    gameEn: PropTypes.string.isRequired,
    awardNo: PropTypes.string,
    awardTime: PropTypes.string,
    periodName: PropTypes.string,
    // 列表页需要
    rowData: PropTypes.object,
    row: PropTypes.string,
  };

  static defaultProps = {
    gameEn: 'kuai3',
    awardNo: '',
    awardTime: '',
    periodName: '',
    // 列表页需要
    row: '',
    rowData: null,
  };
  render() {
    const getAwardNoArray = (awardNo) => {
      const numbers = awardNo.split(' ');
      return numbers;
    };
    const getAwardDescription = (awardNoArr) => {
      const count = Number(awardNoArr[0]) + Number(awardNoArr[1]) + Number(awardNoArr[2]);
      return `和值:${count}`;
    };
    const getPeriodString = (awardTime, periodName) => {
      if (awardTime && periodName) {
        return helper.getPeriodTimeString(awardTime, periodName);
      }
      return '';
    };
    const getDice = (number) => {
      if (number === '1') {
        return <Image source={require('../../../images/Dice_1.png')} />;
      } else if (number === '2') {
        return <Image source={require('../../../images/Dice_2.png')} />;
      } else if (number === '3') {
        return <Image source={require('../../../images/Dice_3.png')} />;
      } else if (number === '4') {
        return <Image source={require('../../../images/Dice_4.png')} />;
      } else if (number === '5') {
        return <Image source={require('../../../images/Dice_5.png')} />;
      }
      return <Image source={require('../../../images/Dice_6.png')} />;
    };
    if (this.props.cellStyle === 'tabHall') {
      const awardNoArr = getAwardNoArray(this.props.awardNo);
      if (this.props.awardNo) {
        return (
          <TouchableOpacity activeOpacity={1.0} onPress={this.props.onPress} style={{ height: 87 * X_SCALE, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ height: 87 * X_SCALE, justifyContent: 'space-between' }}>
              <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginLeft: 15, fontSize: 16 }}>{GlobalHelper
                  .getCNNameFor(this.props.gameEn)}</Text>
                <Text style={{ marginLeft: 5, fontSize: 12, color: '#aaaaaa' }}>{getPeriodString(this.props.awardTime, this.props.periodName)}</Text>
              </View>
              <View style={{ marginLeft: 15, marginBottom: 10 * X_SCALE, flexDirection: 'row', alignItems: 'center' }}>
                <ImageBackground style={{ width: 126, height: 35, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} source={require('../../../images/HistoryK3Bg.png')}>
                  {getDice(awardNoArr[0])}
                  {getDice(awardNoArr[1])}
                  {getDice(awardNoArr[2])}
                </ImageBackground>
                <Text style={{ marginLeft: 10 }}>{getAwardDescription(awardNoArr)}</Text>
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
              <Text style={{ marginLeft: 15, fontSize: 16 }}>{GlobalHelper
                .getCNNameFor(this.props.gameEn)}</Text>
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
      if (this.props.row === '0') {
        return (
          <View>
            <TouchableOpacity activeOpacity={1.0} onPress={route} style={{ height: 87, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ height: 87, justifyContent: 'space-between' }}>
                <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ marginLeft: 5, fontSize: 12, color: '#aaaaaa' }}>{getPeriodString(this.props.rowData.awardTime, this.props.rowData.periodName)}</Text>
                </View>
                <View style={{ marginLeft: 15, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                  <ImageBackground style={{ width: 126, height: 35, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} source={require('../../../images/HistoryK3Bg.png')}>
                    {getDice(awardNoArr[0])}
                    {getDice(awardNoArr[1])}
                    {getDice(awardNoArr[2])}
                  </ImageBackground>
                  <Text style={{ marginLeft: 10 }}>{getAwardDescription(awardNoArr)}</Text>
                </View>
              </View>
              <Image style={{ marginRight: 15 }} source={require('../../../images/historyCellArrow.png')} />
            </TouchableOpacity>
            <View style={{ height: LINE_HEIGHT, width: SCREEN_WIDTH, backgroundColor: '#ececec' }} />
          </View>
        );
      }
      return (
        <View>
          <TouchableOpacity activeOpacity={1.0} onPress={route} style={{ height: 87, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ height: 87, justifyContent: 'space-between' }}>
              <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginLeft: 5, fontSize: 12, color: '#aaaaaa' }}>{getPeriodString(this.props.rowData.awardTime, this.props.rowData.periodName)}</Text>
              </View>
              <View style={{ marginLeft: 15, marginBottom: 15, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.redText}>{awardNoArr[0]}</Text>
                <Text style={styles.redText}>{awardNoArr[1]}</Text>
                <Text style={styles.redText}>{awardNoArr[2]}</Text>
                <Text style={{ marginLeft: 34 }}>{getAwardDescription(awardNoArr)}</Text>
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
