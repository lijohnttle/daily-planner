import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Button } from 'native-base';
import variables from '../../theme/variables/custom';
import { msToHHmm } from '../../utils/dateTimeHelper';
import Icon from 'react-native-vector-icons/AntDesign';
import TaskStatuses from '../../constants/TaskStatuses';
import { TaskCommands } from './TaskCommands';
import { changeTaskStatus } from '../../ducks/taskStatuses';
import { useSelector, useDispatch } from 'react-redux';

const styles = StyleSheet.create({
    root: {
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 2,
    },
    task: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 8,
        height: 48,
    },
    name: {
        flexGrow: 1,
        color: variables.defaultTextColor,
    },
    duration: {
        color: variables.disabledTextColor,
        marginRight: 24,
    },
    status: {
        width: 32,
    },
});

const getTaskCommands = (taskId, taskStatus, dispatch) => {
    const commands = [];

    if (taskStatus === TaskStatuses.PENDING) {
        commands.push(
            {
                id: 'start',
                text: "START",
                action: () => dispatch(changeTaskStatus(taskId, TaskStatuses.ACTIVE)),
            },
        );
    }

    if (taskStatus === TaskStatuses.PENDING || taskStatus === TaskStatuses.ACTIVE) {
        commands.push(
            {
                id: 'complete',
                text: "COMPLETE",
                action: () => dispatch(changeTaskStatus(taskId, TaskStatuses.DONE)),
            },
        );
    }

    if (taskStatus === TaskStatuses.DONE) {
        commands.push(
            {
                id: 'reset',
                text: "RESET",
                action: () => dispatch(changeTaskStatus(taskId, TaskStatuses.PENDING)),
            },
        );
    }

    return commands;
};

export const Task = ({ task, withinActiveGroup }) => {
    const taskStatus = useSelector(state => state.taskStatuses[task.id] || TaskStatuses.PENDING);
    const dispatch = useDispatch();
    const [isPressed, press] = useState(false);
    
    const taskCommands = withinActiveGroup && isPressed ? getTaskCommands(task.id, taskStatus, dispatch) : [];

    return (
        <View style={styles.root}>
            <Button
                light
                style={styles.task}
                onPress={() => press(!isPressed)}>
                <>
                    <Text style={styles.name}>{task.name}</Text>

                    <Text style={styles.duration}>{task.duration ? msToHHmm(task.duration) : '—:—'}</Text>

                    <View style={styles.status}>
                        {taskStatus === TaskStatuses.DONE ? <Icon name="checkcircle" size={24} color={variables.disabledTextColor} /> : null}
                        
                        {taskStatus === TaskStatuses.ACTIVE ? <Icon name="clockcircle" size={24} color={variables.brandSuccess} /> : null}
                    </View>
                </>
            </Button>

            <TaskCommands commands={taskCommands} />
        </View>
    );
};