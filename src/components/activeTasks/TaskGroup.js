import React from 'react';
import { View, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import variables from '../../theme/variables/custom';
import { TasksList } from './TasksList';

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
                {taskGroup.intervalFrom}&nbsp;—&nbsp;{taskGroup.intervalTo}
            </Text>

            <TasksList tasks={tasks} />
        </View>
    )
};