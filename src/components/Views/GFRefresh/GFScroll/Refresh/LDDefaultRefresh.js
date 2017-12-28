import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
} from 'react-native';
import BaseComponent from '../../../BaseComponent';
import { RefreshStatus } from '../LDRLStatus';
import PropTypes from 'prop-types';
const ScreenWidth = Dimensions.get('window').width;// 屏幕宽度

const defaultHeaderStyles = StyleSheet.create({
  background: {
    flexDirection: 'row',
    alignItems: 'center',
   /* position: 'absolute',
    top: -69.5,
    left: 0,
    right: 0,*/
    height: 70,
    justifyContent: 'center',
  },
  pigView: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    top: 0,
    left: ((ScreenWidth / 2) - 93),
    height: 70,
    width: 35,
    backgroundColor: 'gray',
  },
  status: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    top: 22.5,
    left: 95.5,
  },
  statusTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333333',
  },
  date: {
    fontSize: 11,
    color: '#333333',
    marginTop: 5,
  },
});

export const RefreshTitle = {
  pullToRefresh: '下拉刷新',
  releaseToRefresh: '释放立即刷新',
  refreshing: '好运加载中',
};

Date.prototype.Format = function dateFormate(fmt) {
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
  };
  let sfmt = fmt;
  if (/(y+)/.test(sfmt)) {
    sfmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
  }

  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(sfmt)) {
      sfmt = sfmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  });

  return sfmt;
};

export default class LDDefaultRefresh extends BaseComponent {
  static propTypes = {// 用来指定props的类型
    refreshStatus: PropTypes.number.isRequired,
    scrollOffsetY: PropTypes.number.isRequired,//eslint-disable-line
  };

  constructor(props) {
    super(props);
      // 初始状态
    this.state = {
      pigTop: new Animated.Value(22.5),
      coinTop: new Animated.Value(5),
      coinOpacity: 0,
      rotation: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refreshStatus === RefreshStatus.refreshDown ) {
        // 刷新完归位以后,保存一下刷新时间
      this.refreshLastDate = new Date();
      this.setState({
        coinOpacity: 0,
        rotation: new Animated.Value(0),
      });
    }
    if (nextProps.refreshStatus === RefreshStatus.refreshing) {
      this.setState({
        coinOpacity: 1,
      });
    }
    if (this.props.refreshStatus === RefreshStatus
    .pullToRefresh && nextProps.refreshStatus === RefreshStatus.releaseToRefresh) {
       // 小猪弹跳
      Animated.sequence([
        // 先向上位移
        Animated.timing(this.state.pigTop, {
          toValue: 18,
          duration: 30,
        }),
        // 然后回到原来位置
        Animated.timing(this.state.pigTop, {
          toValue: 22.5,
          duration: 30,
        }),
      ]).start();
    }
  }
  getRefreshDate() {
    if (this.refreshLastDate) {
      const time = (new Date()).getTime() - this.refreshLastDate;
      if (time < 60 * 1000) {
        return '最新刷新时间:刚刚';
      } else if (time < 3600 * 1000) {
        const timeNumber = parseInt(time / (60 * 1000), 0);
        return `最新刷新于:${timeNumber}分钟前`;
      } else if (time < 3600 * 24 * 1000) {
        const timeNumber = parseInt(time / (60 * 60 * 1000), 0);
        return `最新刷新于:${timeNumber}小时前`;
      }
      return `最新刷新于:${this.refreshLastDate.Format('MM月dd日')}`;
    }
    return '上次刷新时间:从未';
  }
  startRefreshingAnimation() {
    if (this.props.refreshStatus !== RefreshStatus.refreshing) {
      return;
    }
    Animated.parallel([
      // =========金币动画===================
       // 掉金币
      Animated.sequence([
        // 先向下位移
        Animated.timing(this.state.coinTop, {
          toValue: 22.5,
          duration: 50,
        }),
        // 然后回到原来位置
        Animated.timing(this.state.coinTop, {
          toValue: 5,
          duration: 50,
        }),
      ]),
      // =========小猪动画===============
      // 小猪摇摆
      Animated.sequence([
        // 左倾斜
        Animated.timing(this.state.rotation, {
          toValue: -0.1,
          duration: 100,
        }),
        // 回到水平位置
        Animated.timing(this.state.rotation, {
          toValue: 0,
          duration: 100,
        }),
        // 右倾斜
        Animated.timing(this.state.rotation, {
          toValue: 0.1,
          duration: 100,
        }),
         // 回到水平位置
        Animated.timing(this.state.rotation, {
          toValue: 0,
          duration: 100,
        }),
      ]),
    ]).start(() => this.startRefreshingAnimation());
  }

  renderRefreshDate() {
    return (
      <Text style={defaultHeaderStyles.date}>{this.getRefreshDate()}</Text>
    );
  }

  renderRefreshTitle() {
    if (this.props.refreshStatus === RefreshStatus.pullToRefresh) {
      return (
        <Text style={defaultHeaderStyles.statusTitle}>{RefreshTitle.pullToRefresh}</Text>
      );
    } else if (this.props.refreshStatus === RefreshStatus.releaseToRefresh) {
      return (
        <Text style={defaultHeaderStyles.statusTitle}>{RefreshTitle.releaseToRefresh}</Text>
      );
    } else if (this.props.refreshStatus === RefreshStatus.refreshing) {
      return (
        <Text style={defaultHeaderStyles.statusTitle}>{RefreshTitle.refreshing}</Text>
      );
    }
    return null;
  }

  renderCoin() {
    return (
      <Animated.Image
        source={require('../images/LDCoin.png')}
        style={{
          position: 'absolute',
          top: this.state.coinTop,
          left: ((ScreenWidth / 2) - 80),
          opacity: this.state.coinOpacity,
        }}
      />
    );
  }

  renderPig() {
    return (
      <Animated.Image
        source={require('../images/LDPig.png')}
        style={{
          position: 'absolute',
          top: this.state.pigTop,
          left: ((ScreenWidth / 2) - 93),
          transform: [{
            rotateZ: this.state.rotation.interpolate({
              inputRange: [-1, 1],
              outputRange: ['-180deg', '180deg'],
            }),
          }],
        }}
      />
    );
  }
  render() {
    this.startRefreshingAnimation();
    return (
      <View style={defaultHeaderStyles.background}>
        {this.renderCoin()}
        {this.renderPig()}
        <View style={defaultHeaderStyles.status}>
          {this.renderRefreshTitle()}
          {this.renderRefreshDate()}
        </View>
      </View>
    );
  }
}
