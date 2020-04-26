import React from 'react';
import { connect } from 'react-redux';
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

class ActiveTasksList extends React.Component {
    render() {
        return (
            <View>
                {this.props.days.map(day => (
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
}

const mapStateToProps = state => {
    const displayData = convertToDisplayDataGroupedByDays(state.days, state.taskGroups, state.tasks);

    return {
        days: displayData.days,
    };
};

const ActiveTasksListExport = connect(mapStateToProps)(ActiveTasksList);

export { ActiveTasksListExport as ActiveTasksList };