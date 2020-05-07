import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Input, Button, Icon } from 'native-base';
import ActionSheet from 'react-native-actionsheet';
import { useNavigation } from '@react-navigation/native';
import { ButtonListItem, Text } from '../atomic';
import { PropertyList, PropertyListItem } from '../medium';
import { Routes } from '../../navigation/schedule-builder-navigator';
import variables from '../../theme/variables/custom';
import { msToHHmm } from '../../utils/dateTimeHelper';
import { useDebouncer } from '../../utils/debounce';

const styles = StyleSheet.create({
    nameInput: {
        flex: 1,
        paddingLeft: 8,
        textAlign: 'center',
        backgroundColor: variables.brandLight,
        elevation: 2,
    },
    settingsButton: {
        marginLeft: 2,
        elevation: 0,
    },
});

const changePriorityCommands = [
    { text: 'High', value: 'high', color: 'red' },
    { text: 'Optional', value: 'optional' },
    { text: 'Cancel' },
];

const settingsCommands = [
    { text: 'Delete' },
    { text: 'Cancel' },
];

export default ({ task, onChangeTask, onDeleteTask }) => {
    const [taskName, setTaskName] = useState(task.name);
    const [shouldSaveName, setShouldSaveName] = useState(false);
    const navigation = useNavigation();
    const saveNameDebouncer = useDebouncer(() => setShouldSaveName(true), 300);
    const priorityActionSheetRef = useRef();
    const settingsActionSheetRef = useRef();
    const loaded = useRef(false);

    useEffect(() => {
        if (loaded.current) {
            saveNameDebouncer();
        }
        else {
            loaded.current = true;
        }
    }, [taskName]);

    useEffect(() => {
        if (shouldSaveName) {
            setShouldSaveName(false);

            onChangeTask({ id: task.id, name: taskName });
        }
    }, [shouldSaveName]);

    return (
        <View>
            <PropertyList
                toolbar={
                    <Button
                        dark
                        style={styles.settingsButton}
                        onPress={() => settingsActionSheetRef.current.show() /*navigation.push(Routes.TaskMenu, { taskId: task.id })*/}>
                        <Icon type="FontAwesome" name="ellipsis-v" style={{ color: variables.textColor, fontSize: 16 }} />
                    </Button>
                }>
                <PropertyListItem label="Name:">
                    <Input style={styles.nameInput} placeholder="Name" onChange={e => setTaskName(e.nativeEvent.text)} value={taskName} />
                </PropertyListItem>
                <PropertyListItem label="Duration:">
                    <ButtonListItem
                        light
                        style={{ justifyContent: 'center' }}
                        onPress={() => navigation.push(Routes.TaskDuration, { taskId: task.id })}>
                        {task.duration ? msToHHmm(task.duration) : '—:—'}
                    </ButtonListItem>
                </PropertyListItem>
                <PropertyListItem label="Priority:">
                    <ButtonListItem
                        light
                        style={{ justifyContent: 'center' }}
                        onPress={() => priorityActionSheetRef.current.show()}>
                        <Text style={{ textTransform: 'capitalize' }}>
                            {task.priority}
                        </Text>
                    </ButtonListItem>
                </PropertyListItem>
            </PropertyList>

            <ActionSheet
                ref={priorityActionSheetRef}
                title={<Text style={{ color: 'black' }}>Change priority</Text>}
                options={changePriorityCommands.map(t => t.text)}
                cancelButtonIndex={2}
                onPress={(commandIndex) => {
                    const command = changePriorityCommands[commandIndex];
    
                    if (command.value) {
                        onChangeTask({
                            id: task.id,
                            priority: command.value,
                        });
                    }
                }} />

            <ActionSheet
                ref={settingsActionSheetRef}
                title={<Text style={{ color: 'black' }}>Task settings</Text>}
                options={settingsCommands.map(t => t.text)}
                cancelButtonIndex={1}
                onPress={(commandIndex) => {
                    if (commandIndex === 0) {
                        onDeleteTask(task.id);
                    }
                }} />
        </View>
    );
};