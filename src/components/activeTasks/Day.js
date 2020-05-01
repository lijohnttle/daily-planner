import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import variables from '../../theme/variables/custom';
import { TaskGroupsList } from './TaskGroupsList';

const styles = StyleSheet.create({
    header: {
        color: variables.disabledTextColor,
        textTransform: "uppercase",
        fontSize: variables.DefaultFontSize * 1.2,
        padding: 8,
    }
});

export const Day = ({ day, taskGroups }) => {
    return (
        <View>
            <Text style={styles.header}>
                {day.name}
            </Text>

            <TaskGroupsList taskGroups={taskGroups} />
        </View>
    );
};