import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import variables from '../../theme/variables/custom';
import { TasksGroup } from './TasksGroup';
import { convertToDisplayDataGroupedByDays } from '../../converters/activeTasksList';

const styles = StyleSheet.create({
    taskGroupHeader: {
        color: variables.disabledTextColor,
        textTransform: "uppercase",
        fontSize: variables.DefaultFontSize * 1.2,
        padding: 8,
    }
});

export const ActiveTasksList = () => {
    const days = useSelector(state => convertToDisplayDataGroupedByDays(state.days, state.taskGroups, state.tasks).days);

    return (
        <View>
            {days.map(day => (
                <View key={day.id}>
                    <Text style={styles.taskGroupHeader}>
                        {day.name}
                    </Text>

                    {day.taskGroups.map(taskGroup => <TasksGroup key={taskGroup.id} taskGroup={taskGroup} />)}
                </View>
            ))}
        </View>
    );
}