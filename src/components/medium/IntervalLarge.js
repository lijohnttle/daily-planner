import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Button } from 'native-base';
import { TimestampLarge } from '../atomic';

const styles = StyleSheet.create({
    intervalContainer: {
        flexDirection: 'row',
    },
    intervalButton: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        height: null,
    },
});

export default ({ intervalFrom, intervalTo }) => {
    return (
        <View style={styles.intervalContainer}>
            <Button warning style={[styles.intervalButton, { marginRight: 1 }]}>
                <TimestampLarge timestampMs={intervalFrom} label="From" />
            </Button>
            <Button warning style={[styles.intervalButton, { marginLeft: 1 }]}>
                <TimestampLarge timestampMs={intervalTo} label="To" />
            </Button>
        </View>
    );
};