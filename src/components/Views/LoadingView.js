import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';

export default function LoadingView(props) {
    return (
        <View style={styles.view}>
            <ActivityIndicator size="small"/>
        </View>
    );
}
const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});
