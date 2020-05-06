import React from 'react';
import { View, Text } from 'native-base';
import { Task } from './';

export const TasksList = ({ tasks, onChangeTask }) => {
    return (
        <View>
            {tasks.map(task => <Task key={task.id} task={task} onChangeTask={onChangeTask} />)}
        </View>
    );
};