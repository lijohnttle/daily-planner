import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Text, View, Button } from 'native-base';
import variables from '../../theme/variables/custom';
import { msToHHmm } from '../../utils/dateTimeHelper';
import Icon from 'react-native-vector-icons/AntDesign';
import TaskStatuses from '../../constants/TaskStatuses';

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
        marginBottom: 0,
        height: 48,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
        marginBottom: 8,
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
    inverseTextColor: {
        color: variables.inverseTextColor,
    }
});

const getTaskCommands = taskStatus => {
    if (taskStatus === TaskStatuses.PENDING) {
        return [
            { text: "START" },
            { text: "COMPLETE" }
        ];
    }
    if (taskStatus === TaskStatuses.ACTIVE) {
        return [
            { text: "COMPLETE" }
        ];
    }
    if (taskStatus === TaskStatuses.DONE) {
        return [
            { text: "RESET" }
        ];
    }
};

const Task = ({ task, withinActiveGroup }) => {
    const [isPressed, press] = useState(false);

    task.status = TaskStatuses.DONE;

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
                        {task.status === TaskStatuses.DONE ? <Icon name="checkcircle" size={24} color={variables.disabledTextColor} /> : null}
                        
                        {task.status === TaskStatuses.ACTIVE ? <Icon name="clockcircle" size={24} color={variables.disabledTextColor} /> : null}
                    </View>
                </>
            </Button>

            {withinActiveGroup && isPressed ? getTaskCommands(task.status).map(command => (
                <Button key={command.text} light style={styles.button}>
                    <Text style={{ color: variables.defaultTextColor }}>
                        {command.text}
                    </Text>
                </Button>
            )) : null}
        </View>
    );
};

export { Task };