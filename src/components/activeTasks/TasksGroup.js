import React from 'react';
import { View, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { Task } from './Task';
import variables from '../../theme/variables/custom';

const styles = StyleSheet.create({
    header: {
        color: variables.disabledTextColor,
        textTransform: "uppercase",
        padding: 8,
        textAlign: "center",
    }
});

const TasksGroup = ({ taskGroup }) => {
    return (
        <View>
            <Text style={styles.header}>
                {taskGroup.intervalFrom}&nbsp;—&nbsp;{taskGroup.intervalTo}
            </Text>

            {taskGroup.tasks.map(task => <Task key={task.id} task={task} />)}
        </View>
    )
};

export { TasksGroup };