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

export default ({ intervalFrom, duration, onIntervalFromChange, onDurationChange }) => {
    return (
        <View style={styles.intervalContainer}>
            <Button warning style={[styles.intervalButton, { marginRight: 1 }]} onPress={onIntervalFromChange}>
                <TimestampLarge timestampMs={intervalFrom} label="From" />
            </Button>
            <Button warning style={[styles.intervalButton, { marginLeft: 1 }]} onPress={onDurationChange}>
                <TimestampLarge timestampMs={duration} label="Duration" />
            </Button>
        </View>
    );
};