import React from 'react';
import {
  NativeModules,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  rootTouchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 90,
    height: 20,
  },
  bellImage: {
    width: 14,
    height: 14,
  },
  settingText: {
    fontSize: 17,
    color: 'white',
  },
});

export default function HistoryawardsPushSettingsView() {
  const onclicked = () => {
    NativeModules.LDRNBridge.routeWithURL('pushNotificationSetting', {});
  };
  return (
    <TouchableOpacity style={styles.rootTouchableOpacity} onPress={onclicked}>
      <Image style={styles.bellImage} source={require('../../../images/Historyawards_pushSettings.png')} />
      <Text style={styles.settingText}>开奖推送</Text>
    </TouchableOpacity>
  );
}

