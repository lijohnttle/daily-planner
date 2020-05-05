import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Input, Button, Icon, Picker } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import ScheduleBuilderRoutes from '../../../navigators/ScheduleBuilderRoutes';
import variables from '../../../theme/variables/custom';
import { msToHHmm } from '../../../utils/dateTimeHelper';

const styles = StyleSheet.create({
    root: {
        marginBottom: 32,
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
        elevation: 2,
    },
    nameBar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameInput: {
        flex: 1,
    },
    settingsButton: {
        justifyContent: 'center',
        alignSelf: 'flex-end',
        height: 32,
        elevation: 0,
    },
});

export const Task = ({ task, onChangeTask }) => {
    const [taskName, setTaskName] = useState(task.name);
    const [taskPriority, setTaskPriority] = useState(task.priority);
    const navigation = useNavigation();

    const handleChangeTaskName = e => {
        setTaskName(e.nativeEvent.text);
    };

    const handleEndEditingTaskName = () => {
        onChangeTask({
            id: task.id,
            name: taskName,
        });
    };

    const handleChangePriority = value => {
        setTaskPriority(value);
        onChangeTask({
            id: task.id,
            priority: value,
        });
    };

    return (
        <View style={styles.root}>
            <Button
                dark
                style={styles.settingsButton}
                onPress={() => navigation.push(ScheduleBuilderRoutes.TaskMenu, { taskId: task.id })}>
                <Icon type="FontAwesome" name="cog" style={{ color: variables.textColor, fontSize: 16 }} />
            </Button>

            <View style={[styles.bar, styles.nameBar]}>
                <Input style={styles.nameInput} placeholder="Name" onChange={handleChangeTaskName} onEndEditing={handleEndEditingTaskName} value={taskName} />
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
        </View>
    );
};