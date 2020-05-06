import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import variables from '../../theme/variables/custom';
import { msToHHmm } from '../../utils/dateTimeHelper';
import Text from './Text';

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
    },
    label: {
        color: variables.disabledTextColor,
    },
    value: {
        fontSize: variables.fontSizeH3,
    }
});

export default ({ timestampMs, label }) => (
    <View style={styles.root}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{msToHHmm(timestampMs)}</Text>
    </View>
);