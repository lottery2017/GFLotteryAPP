import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    color: '#8e8e8e',
  },
});

export default function EmptyHintView(props) {
  return (
    <View
      style={[styles.view, {
        height: props.height,
      }]}
    >
      <Image style={styles.image} source={require('../../../images/EmptyHint.png')} />
      <Text style={styles.text}>
            此期次无开奖数据
      </Text>
    </View>
  );
}

EmptyHintView.propTypes = {
  height: PropTypes.number.isRequired,
};
