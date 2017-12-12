import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Image,
} from 'react-native';
import { LoadMoreStatus } from '../LDLoadMoreRefresh';
import BaseComponent from '../../BaseComponent';
import PropTypes from 'prop-types';
const styles = StyleSheet.create({
  appendLoading: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
  },
  text: {
    color: 'gray',
    fontSize: 12,
  },
});

export default class LDDefaultLoadMore extends BaseComponent {
  static propTypes = {
    loadMoreStatus: PropTypes.number.isRequired,
  };
  render() {
    if (this.props.loadMoreStatus === LoadMoreStatus.loading) {
      return (
        <View style={styles.appendLoading}>
          <ActivityIndicator style={{ marginRight: 10 }} size="small" />
          <Text style={styles.text}>正在加载....</Text>
        </View>
      );
    } else if (this.props.loadMoreStatus === LoadMoreStatus.noMoreData) {
      return (
        <View style={styles.appendLoading}>
          <Image style={{ marginRight: 10 }} source={require('../images/LDSmileFace.png')} />
          <Text style={styles.text}>已经到底啦~</Text>
        </View>
      );
    } else if (this.props.loadMoreStatus === LoadMoreStatus.error) {
      return (
        <View style={styles.appendLoading}>
          <Image style={{ marginRight: 10 }} source={require('../images/LDSadFace.png')} />
          <Text style={styles.text}>加载失败！</Text>
        </View>
      );
    } else if (this.props.loadMoreStatus === LoadMoreStatus.idle) {
      return (
        <View style={styles.appendLoading}>
          <Text style={styles.text}>上拉加载更多 </Text>
        </View>
      );
    }
    return null;
  }
}

