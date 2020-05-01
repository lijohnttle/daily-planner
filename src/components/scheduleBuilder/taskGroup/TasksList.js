import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { Task } from './';
import variables from '../../../theme/variables/custom';

const styles = StyleSheet.create({
    root: {
        margin: 8,
    },
    header: {
        color: variables.disabledTextColor,
        textTransform: 'uppercase',
        fontSize: variables.DefaultFontSize * 1.2,
        paddingBottom: 8,
    },
});

export const TasksList = ({ tasks, onChangeTask, onDeleteTask }) => {
    return (
        <View style={styles.root}>
            <Text style={styles.header}>
                TASKS
            </Text>

            {tasks.map(task => <Task key={task.id} task={task} onChangeTask={onChangeTask} onDeleteTask={onDeleteTask} />)}
        </View>
    );
};