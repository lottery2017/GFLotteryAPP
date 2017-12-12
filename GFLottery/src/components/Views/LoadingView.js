import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function LoadingView(props) {
  return (
    <View
      style={[styles.view, {
        height: props.height,
      }]}
    >
      <ActivityIndicator size="small" />
    </View>
  );
}

LoadingView.propTypes = {
  height: PropTypes.number.isRequired,
};
