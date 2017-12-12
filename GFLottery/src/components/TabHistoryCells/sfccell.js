import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  Dimensions,
} from 'react-native';
import * as helper from './helper';
import BaseComponent from '../Views/BaseComponent';
import PropTypes from 'prop-types';
const SCREEN_WIDTH = Dimensions.get('window').width;
const X_SCALE = SCREEN_WIDTH / 320.0;
const LINE_HEIGHT = 1;
const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  block: { marginRight: 3.5, alignItems: 'center', justifyContent: 'center' },
  text: { backgroundColor: 'transparent', color: 'white', fontSize: 18 },
  withteText: { backgroundColor: 'transparent', color: 'white', fontSize: 18 },
  redText: { backgroundColor: 'transparent', color: 'red', fontSize: 18 },
});
export default class SFCCell extends BaseComponent {
  static propTypes = {
    gameEn: PropTypes.string.isRequired,
    awardNo: PropTypes.string,
    awardTime: PropTypes.string,
    periodName: PropTypes.string,
    cellStyle: PropTypes.oneOf(['tabHall', 'historyList', 'detail']).isRequired,
    // 列表页需要
    row: PropTypes.string,
    rowData: PropTypes.object,
  };
  static defaultProps = {
    gameEn: 'sfc',
    awardNo: '',
    awardTime: '',
    periodName: '',
    // 列表页需要
    row: '',
    rowData: null,
  };

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
      const awardNoArr = getAwardNoArray(this.props.awardNo);
      const route = () => {
        NativeModules.LDRNBridge.routeWithURL('reactnative',
          { moduleName: 'SFCHistoryList', showStyle: 'push', hideTabbar: true, properties: { gameEn: this.props.gameEn } });
      };
      if (this.props.awardNo) {
        return (
          <TouchableOpacity activeOpacity={1.0} onPress={route} style={{ height: 87 * X_SCALE, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ height: 87 * X_SCALE, justifyContent: 'space-between' }}>
              <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginLeft: 15, fontSize: 16 }}>胜负彩/任选九</Text>
                <Text style={{ marginLeft: 5, fontSize: 12, color: '#aaaaaa' }}>{getPeriodString(this.props.awardTime, this.props.periodName)}</Text>
              </View>
              <View style={{ marginLeft: 15, marginBottom: 10 * X_SCALE, flexDirection: 'row' }}>
                {awardNoArr.map((number, index) => {
                  const key = `${number} ${index}`;
                  return (
                    <Image key={key} style={styles.block} source={require('../../../images/HistorySFC.png')}>
                      <Text style={styles.text}>{number}</Text>
                    </Image>
                  );
                })
                }
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
              <Text style={{ marginLeft: 15, fontSize: 16 }}>胜负彩/任选九</Text>
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
      const awardNoArray = getAwardNoArray(this.props.rowData.awardNo);
      const numBGImage = this.props.row === '0' ? require('../../../images/HistorySFC.png') : require('../../../images/HistorySFCTrans.png');
      const textStyle = this.props.row === '0' ? styles.withteText : styles.redText;
      return (
        <View>
          <TouchableOpacity activeOpacity={1.0} onPress={route} style={{ height: 87 * X_SCALE, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ height: 87, justifyContent: 'space-between' }}>
              <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginLeft: 5, fontSize: 12, color: '#aaaaaa' }}>{getPeriodString(this.props.rowData.awardTime, this.props.rowData.periodName)}</Text>
              </View>
              <View style={{ marginLeft: 15, marginBottom: 10 * X_SCALE, flexDirection: 'row' }}>
                {awardNoArray.map((number, index) => {
                  const key = `${number} ${index}`;
                  return (
                    <Image key={key} style={styles.block} source={numBGImage}>
                      <Text style={textStyle}>{number}</Text>
                    </Image>
                  );
                })
                }
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

