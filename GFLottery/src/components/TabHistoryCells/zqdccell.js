import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import BaseComponent from '../Views/BaseComponent';
import PropTypes from 'prop-types';
const SCREEN_WIDTH = Dimensions.get('window').width;
const X_SCALE = SCREEN_WIDTH / 320.0;

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  ball: { width: 31, height: 31, marginRight: 3.5, alignItems: 'center', justifyContent: 'center' },
  text: { backgroundColor: 'transparent', color: 'white', fontSize: 13, fontWeight: 'bold' },
});

export default class ZQDCCell extends BaseComponent {
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
    if (this.props.matchItem.concedeBall && this.props.matchItem.concedeBall !== 0) {
      return <Text style={[styles.text]}>({this.props.matchItem.concedeBall})</Text>;
    }
    return null;
  }
  render() {
    if (this.props.matchItem) {
      return (
        <View style={{ height: 87 * X_SCALE, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ width: SCREEN_WIDTH - 60, height: 87 * X_SCALE, justifyContent: 'space-between' }}>
            <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginLeft: 15, fontSize: 16 }}>足球单场</Text>
              <Text style={{ marginLeft: 5, fontSize: 12, color: '#aaaaaa' }}>第{this.props.matchItem.period}期</Text>
            </View>
            <View style={{ marginLeft: 15, marginRight: 30, marginBottom: 10 * X_SCALE, flexDirection: 'row', alignItems: 'center' }}>
              <Image resizeMode="stretch" capInsets={{ top: 0, left: 100, bottom: 0, right: 0 }} style={{ width: SCREEN_WIDTH - 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} source={require('../../../images/HistoryDCBack.png')}>
                <Text style={[styles.text]}>{this.props.matchItem.teamA}</Text>
                {this.renderConcedeBall()}
                <Text style={[styles.text, { marginRight: 15, marginLeft: 15 }]}>{this.props
                  .matchItem.scoreA}:{this.props.matchItem.scoreB}</Text>
                <Text style={[styles.text]}>{this.props.matchItem.teamB}</Text>
              </Image>
            </View>
          </View>
          <Image style={{ marginRight: 15 }} source={require('../../../images/historyCellArrow.png')} />
        </View>
      );
    }
    return (
      <View style={{ height: 87 * X_SCALE, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ width: SCREEN_WIDTH - 60, height: 87 * X_SCALE, justifyContent: 'space-between' }}>
          <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginLeft: 15, fontSize: 16 }}>足球单场</Text>
          </View>
          <View style={{ marginLeft: 15, marginRight: 30, marginBottom: 20 * X_SCALE, flexDirection: 'row', alignItems: 'center' }}>
            <Image resizeMode="stretch" capInsets={{ top: 0, left: 100, bottom: 0, right: 0 }} style={{ width: SCREEN_WIDTH - 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} source={require('../../../images/HistoryDCBack.png')}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', backgroundColor: '#ffffff00' }}>暂无开奖信息</Text>
            </Image>
          </View>
        </View>
      </View>
    );
  }
}
