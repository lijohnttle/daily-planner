import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Input, Button, Icon } from 'native-base';
import variables from '../../../theme/variables/custom';

const styles = StyleSheet.create({
    root: {
        marginBottom: 48,
    },
    bar: {
        flexDirection: 'row',
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 8,
        height: 48,
        backgroundColor: variables.brandLight,
    },
    deleteButton: {
        alignSelf: 'flex-start',
        paddingLeft: 8,
        paddingRight: 8,
        height: 48,
    },
    settingsButton: {
        justifyContent: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        height: 48,
    },
    nameBar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameLabel: {
        color: variables.disabledTextColor,
        marginRight: 8,
    },
    nameInput: {
        flex: 1,
    },
});

export const Task = ({ task, onChangeTask, onDeleteTask }) => {
    const [taskName, changeTaskName] = useState(task.name);

    const handleChangeTaskName = e => {
        changeTaskName(e.nativeEvent.text);
    };

    const handleEndEditingTaskName = () => {
        onChangeTask({
            id: task.id,
            name: taskName,
        });
    };

    return (
        <View style={styles.root}>
            <View style={[styles.bar, styles.nameBar]}>
                <Text style={styles.nameLabel}>Name:</Text>
                <Input style={styles.nameInput} onChange={handleChangeTaskName} onEndEditing={handleEndEditingTaskName} value={taskName} />
            </View>

            <Button
                danger
                style={styles.deleteButton}
                onPress={() => onDeleteTask(task.id)}>
                <Icon type="FontAwesome" name="trash" style={{ color: variables.textColor, fontSize: variables.fontSizeBase }} />
            </Button>
        </View>
    );
};