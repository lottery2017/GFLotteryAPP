import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  NativeModules,
  TouchableOpacity,
    ImageBackground
} from 'react-native';
import PropTypes from 'prop-types';
import BaseComponent from '../Views/BaseComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const X_SCALE = SCREEN_WIDTH / 320.0;
const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  text: { backgroundColor: 'transparent', color: 'white', fontSize: 13, fontWeight: 'bold' },
});
export default class JCZQCell extends BaseComponent {
  static propTypes = {
    matchItem: PropTypes.object,
  };
  static defaultProps = {
    matchItem: null,
  }
  constructor(props) {
    super(props);
    this.renderConcedeBall = this.renderConcedeBall.bind(this);
  }
  renderConcedeBall() {
    if (this.props.matchItem.concedeBall && this.props.matchItem.concedeBall !== '0') {
      return <Text style={[styles.text]}>({this.props.matchItem.concedeBall})</Text>;
    }
    return null;
  }

  render() {
    if (this.props.matchItem) {
      return (
        <TouchableOpacity activeOpacity={1.0} onPress={this.props.onPress} style={{ height: 87 * X_SCALE, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ width: SCREEN_WIDTH - 60, height: 87 * X_SCALE, justifyContent: 'space-between' }}>
            <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginLeft: 15, fontSize: 16 }}>竞彩足球</Text>
              <Text style={{ marginLeft: 5, fontSize: 12, color: '#aaaaaa' }}>{`主队vs客队 ${this.props.matchItem.matchDay}`}</Text>
            </View>
            <View style={{ marginLeft: 15, marginRight: 30, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
              <ImageBackground resizeMode="stretch" style={{ width: SCREEN_WIDTH * 0.86, height: 87 * X_SCALE * 0.425, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} source={require('../../../images/HistoryFootBallBack.png')}>
                <Text style={[styles.text]}>{this.props.matchItem.teamA}</Text>
                {this.renderConcedeBall()}
                <Text style={[styles.text, { marginRight: 15, marginLeft: 15 }]}>{this.props
                  .matchItem.scoreA}:{this.props.matchItem.scoreB}</Text>
                <Text style={[styles.text]}>{this.props.matchItem.teamB}</Text>
              </ImageBackground>
            </View>
          </View>
          <Image style={{ marginRight: 15 }} source={require('../../../images/historyCellArrow.png')} />
        </TouchableOpacity>
      );
    }
    return (
      <View style={{ height: 87 * X_SCALE, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ width: SCREEN_WIDTH - 60, height: 87 * X_SCALE, justifyContent: 'space-between' }}>
          <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginLeft: 15, fontSize: 16 }}>竞彩足球</Text>
          </View>
          <View style={{ marginLeft: 15, marginRight: 30, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
            <ImageBackground resizeMode="stretch" style={{ width: SCREEN_WIDTH * 0.86, height: 87 * X_SCALE * 0.425, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} source={require('../../../images/HistoryFootBallBack.png')}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', backgroundColor: '#ffffff00' }}>暂无开奖信息</Text>
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }
}
