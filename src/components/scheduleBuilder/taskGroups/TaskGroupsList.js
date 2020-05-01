import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import variables from '../../../theme/variables/custom';
import { TaskGroup } from './TaskGroup';

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

export const TaskGroupsList = () => {
    const route = useRoute();
    const day = route.params['day'];
    const taskGroups = useSelector(state => state.taskGroups.mapByDayId[day.id]) || [];

    return (
        <View style={styles.root}>
            <Text style={styles.header}>
                {day.name}
            </Text>

            {taskGroups.map(taskGroup => <TaskGroup key={taskGroup.id} taskGroup={taskGroup} />)}
        </View>
    );
};