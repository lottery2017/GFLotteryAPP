import React from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    NativeModules,
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HistoryListHeader(props) {
    const route = () => {
        NativeModules.LDRNBridge.routeWithURL('pushNotificationSetting', {});
    };
    /*return (
     <TouchableOpacity activeOpacity={1.0} onPress={route} style={{ height: 31, flexDirection: 'row', backgroundColor: '#FFFCCB', alignItems: 'center', justifyContent: 'space-between' }}>
     <Text style={{ marginLeft: 0.04 * SCREEN_WIDTH, fontSize: 13, color: '#aaaaaa' }}>
     {props.headerLabelString}
     </Text>
     <Image style={{ marginRight: 15 }} source={require('../../../images/historyListCellArrow.png')} />
     </TouchableOpacity>
     );*/
    return null
}

HistoryListHeader.propTypes = {
    headerLabelString: PropTypes.string.isRequired,
};
