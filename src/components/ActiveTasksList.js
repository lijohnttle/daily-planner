import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import Colors from '../Colors';

const styles = StyleSheet.create({
    taskGroupHeader: {
        color: Colors.disabledColor
    }
});

class ActiveTasksList extends React.Component {
    render() {
        return (
            <View>
                {this.props.taskGroups.map(taskGroup => (
                    <View key={taskGroup.id}>
                        <Text style={styles.taskGroupHeader}>
                            {taskGroup.name}
                        </Text>
                    </View>
                ))}
            </View>
        );
    }
}

const mapStateToProps = state => {
    // clone task groups
    const taskGroups = state.taskGroups.map(group => ({
        ...group,
        tasks: []
    }));

    // map group id to group
    const taskGroupById = taskGroups.reduce((result, group) => {
        result[group.id] = group;
        return result;
    }, { });

    // fill tasks array for each group
    state.tasks.forEach(task => {
        const group = taskGroupById[task.groupId];

        if (group) {
            group.tasks.push(task);
        }
    });

    return {
        taskGroups
    };
};

const ActiveTasksListExport = connect(mapStateToProps)(ActiveTasksList);

export { ActiveTasksListExport as ActiveTasksList };