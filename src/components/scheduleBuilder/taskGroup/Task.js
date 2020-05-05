import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Input, Button, Icon, Picker, Row } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import ScheduleBuilderRoutes from '../../../navigators/ScheduleBuilderRoutes';
import variables from '../../../theme/variables/custom';
import { msToHHmm } from '../../../utils/dateTimeHelper';

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
        color: variables.textColor,
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
    const [taskPriority, changeTaskPriority] = useState(task.priority);
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

    const handleChangePriority = value => {
        changeTaskPriority(value);
        onChangeTask({
            id: task.id,
            priority: value,
        });
    };

    return (
        <View style={styles.root}>
            <View style={[styles.bar, styles.nameBar]}>
                <Text style={styles.nameLabel}>Name:</Text>
                <Input style={styles.nameInput} onChange={handleChangeTaskName} onEndEditing={handleEndEditingTaskName} value={taskName} />
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Button
                    light
                    style={{ flex: 1, marginRight: 1, height: 48 }}
                    onPress={() => navigation.push(ScheduleBuilderRoutes.TaskDurationPicker, { taskId: task.id })}>
                    <Text style={{ color: variables.textColor }}>{task.duration ? msToHHmm(task.duration) : '—:—'}</Text>
                </Button>

                <Picker style={[styles.bar, { flex: 1, marginLeft: 1, hieght: 48 }]} mode="dialog" selectedValue={taskPriority} onValueChange={handleChangePriority}>
                    <Picker.Item label="High" value="high" />
                    <Picker.Item label="Optional" value="optional" />
                </Picker>
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