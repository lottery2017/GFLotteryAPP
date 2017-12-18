import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  touchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 79,
    height: 29,
  },
  image: {
    width: 15,
    height: 14,
    marginRight: 5,
  },
  text: {
    color: 'white',
    fontSize: 17.0,
    width: 38,
  },
});

export default function JCHistoryListBarDateView() {
  return (
    <View style={styles.touchableOpacity}>
      <Image style={styles.image} source={require('../../../images/JCZQHistoryListBarDate.png')} />
      <Text style={styles.text}>
            日期
      </Text>
    </View>
  );
}

