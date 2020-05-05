import React from 'react';
import { View, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { TasksList } from './TasksList';
import variables from '../../theme/variables/custom';
import { msToHHmm } from '../../utils/dateTimeHelper';

const styles = StyleSheet.create({
    root: {
        marginBottom: 16,
    },
    header: {
        color: variables.disabledTextColor,
        textTransform: "uppercase",
        padding: 8,
        textAlign: "center",
    }
});

export const TaskGroup = ({ taskGroup, tasks }) => {
    return (
        <View style={styles.root}>
            <Text style={styles.header}>
                {msToHHmm(taskGroup.intervalFrom)}&nbsp;—&nbsp;{msToHHmm(taskGroup.intervalFrom + taskGroup.duration)}
            </Text>

            <TasksList tasks={tasks} />
        </View>
    )
};