import React from 'react';
import { Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import variables from '../../theme/variables/custom';
import { msToHHmm } from '../../utils/dateTimeHelper';

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#2b2c32',
        minHeight: 40,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 2,
        paddingLeft: 8,
        paddingRight: 8,
    },
    name: {
        flexGrow: 1,
    },
    duration: {
        color: variables.disabledTextColor,
        marginRight: 24,
    },
    status: {
        width: 32,
    }
});

const Task = ({ task }) => {
    return (
        <View style={styles.root}>
            <Text style={styles.name}>{task.name}</Text>

            <Text style={styles.duration}>{task.duration ? msToHHmm(task.duration) : '—:—'}</Text>

            <View style={styles.status}>

            </View>
        </View>
    );
};

export { Task };