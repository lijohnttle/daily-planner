import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import variables from '../../theme/variables/custom';

const styles = StyleSheet.create({
    root: {
        margin: 8,
    },
    header: {
        color: variables.disabledTextColor,
        textTransform: "uppercase",
        fontSize: variables.DefaultFontSize * 1.2,
        paddingBottom: 8,
    },
});

export const TaskGroupsList = () => {
    return (
        <View style={styles.root}>
            <Text style={styles.header}>
                INTERVALS
            </Text>
        </View>
    );
};