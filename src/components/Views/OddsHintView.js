import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fffcd9',
  },
});

export default function OddsHintView() {
  return (
    <View style={styles.view}>
      <Image source={require('../../../images/oddsHint.png')} />
    </View>
  );
}
