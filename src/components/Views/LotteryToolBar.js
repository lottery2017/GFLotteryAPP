import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  NativeModules,
} from 'react-native';
import * as GlobalHelper from '../../utils/GlobalHelper';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 44,
    backgroundColor: '#252626',
  },
  touchableOpacityd11: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 33,
    width: 281,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#D7213C',
  },
  touchableOpacityBet: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 33,
    width: 165,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#37393B',
  },
  touchableOpacityQuery: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 33,
    width: 165,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#E21939',
  },
  textdBet: {
    backgroundColor: 'transparent',
    color: '#aaaaaa',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textQuery: {
    backgroundColor: 'transparent',
    color: '#FEEFF1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textd11: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default function LotteryToolBar(props) {
  switch (props.gameEn) {
    case 'ssq':
    case 'dlt':
      return (
        <View style={styles.view}>
          <TouchableOpacity
            style={styles.touchableOpacityBet}
            onPress={() => {
             // NativeModules.LDRNBridge.routeWithURL(`rrzcp://bet?g=${props.gameEn}`, {})
            }}
          >
            <Text style={styles.textdBet}>
              {`投注${GlobalHelper.getCNNameFor(props.gameEn)}`}
            </Text>
          </TouchableOpacity>
          {/*<TouchableOpacity
            style={styles.touchableOpacityQuery}
            onPress={() => { NativeModules.LDRNBridge.routeWithURL(`rrzcp://calculatePrize?gameEn=${props.gameEn}`, {}); }}
          >
            <Text style={styles.textQuery}>
              中奖查询
            </Text>
          </TouchableOpacity>*/}
        </View>
      );
    case 'd11':
    case 'jxd11':
    case 'hljdd11':
    case 'lnd11':
    case 'gdd11':
    case 'zjd11':
    case 'hljd11':
    case 'cqd11':
    case 'jczq':
    case 'jclq':
    case 'kuai3':
    case 'nmgkuai3':
    case 'ahkuai3':
    case 'gxkuai3':
    case 'oldkuai3':
    case 'hbkuai3':
    case 'ssc':
    case 'jxssc':
    case 'klpk':
    case 'x3d':
    case 'zqdc':
    case 'klsf':
    case 'sfgg':
    case 'kl8':
    case 'qxc':
    case 'qlc':
    case 'pl5':
    case 'pl3':
      return (
        <View style={styles.view}>
          <TouchableOpacity
            style={styles.touchableOpacityd11}
            onPress={() => {
              //NativeModules.LDRNBridge.routeWithURL(`rrzcp://bet?g=${props.gameEn}`, {});
            }}
          >
            <Text style={styles.textd11}>
              {`投注${GlobalHelper.getCNNameFor(props.gameEn)}`}
            </Text>
          </TouchableOpacity>
        </View>
      );
    case 'football_sfc':
      return (
        <View style={styles.view}>
          <TouchableOpacity
            style={styles.touchableOpacityBet}
            onPress={() => {
              //NativeModules.LDRNBridge.routeWithURL(`rrzcp://bet?g=${props.gameEn}`, {});
            }}
          >
            <Text style={styles.textdBet}>
              {`投注${GlobalHelper.getCNNameFor(props.gameEn)}`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableOpacityQuery}
            onPress={() => {
             // NativeModules.LDRNBridge.routeWithURL('rrzcp://bet?g=football_9', {});
            }}
          >
            <Text style={styles.textQuery}>
              {`投注${GlobalHelper.getCNNameFor('football_9')}`}
            </Text>
          </TouchableOpacity>
        </View>
      );
    default:
      return null;
  }
}

LotteryToolBar.propTypes = {
  gameEn: PropTypes.string.isRequired,
};
