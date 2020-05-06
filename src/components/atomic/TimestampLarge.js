import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import variables from '../../theme/variables/custom';
import { msToHHmm } from '../../utils/dateTimeHelper';
import Text from './Text';

const styles = StyleSheet.create({
    label: {
        position: 'absolute',
        textTransform: 'uppercase',
        alignSelf: 'flex-start',
        opacity: 0.75,
        left: 8,
    },
    value: {
        fontSize: variables.fontSizeH1,
        marginTop: 12,
        marginBottom: 12,
        textAlign: 'center',
    }
});

export default ({ timestampMs, label }) => (
    <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{msToHHmm(timestampMs)}</Text>
    </View>
);