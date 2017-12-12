import React from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import BaseComponent from '../Views/BaseComponent';
import PropTypes from 'prop-types';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class HallNoticeView extends BaseComponent {
  static propTypes = {
    notices: PropTypes.array.isRequired,
  };

  render() {
    return (
      <View style={{ height: 30 }}>
        <Swiper
          height={30}
          showsButtons={false}
          horizontal={false}
          showsPagination={false}
          scrollEnabled={false}
          loop
          autoplay
          autoplayTimeout={3.0}
        >
          {this.props.notices.map((notice, index) => {
            const key = `${notice.gameCn} ${index}`;
            return (
              <View key={key} style={{ height: 30, backgroundColor: 'white' }}>
                <View key={key} style={{ height: 30, flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={{ marginLeft: 18.5, width: 17, height: 17 }} source={require('../../../images/gift.png')} />
                  <Text style={{ marginLeft: 8, marginTop: 3, color: 'gray', fontSize: 13 }}>羡慕！</Text>
                  <Text style={{ marginTop: 3, color: '#333333', fontSize: 13 }}>{`${notice.bonus.toFixed(2)}元`}</Text>
                  <Text style={{ marginTop: 3, color: 'gray', fontSize: 13, width: SCREEN_WIDTH - 90 - ((notice.bonus.toString().length + 3.5) * 8) }} numberOfLines={1} >{`${notice.gameCn}奖金已被${notice.nickName}收入囊中 `}</Text>
                </View>
              </View>
            );
          })}
        </Swiper>
      </View>
    );
  }
}
