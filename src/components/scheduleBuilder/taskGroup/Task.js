import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Input, Button, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import variables from '../../../theme/variables/custom';
import ScheduleBuilderRoutes from '../../../navigators/ScheduleBuilderRoutes';

const styles = StyleSheet.create({
    root: {
        marginBottom: 24,
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 2,
        height: 48,
        backgroundColor: variables.brandLight,
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
    settingsButton: {
        justifyContent: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        height: 48,
    },
});

export const Task = ({ task, onChangeTask }) => {
    const [taskName, changeTaskName] = useState(task.name);
    const navigation = useNavigation();

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
                light
                style={styles.settingsButton}
                onPress={() => navigation.push(ScheduleBuilderRoutes.TaskMenu, { taskId: task.id })}>
                <Icon type="FontAwesome" name="cog" style={{ color: variables.textColor }} />
            </Button>
        </View>
    );
};