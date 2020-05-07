import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content, View } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actionsheet'
import { ScreenSection, IntervalLarge } from '../../components/medium';
import { Text } from '../../components/atomic';
import { TaskEditor } from '../../components/complex';
import { changeTask, deleteTask } from '../../ducks/tasks';
import { deleteTaskGroup } from '../../ducks/taskGroups';
import { Routes } from '../../navigation/schedule-builder-navigator';

const settingsCommands = [
    { text: 'Delete' },
    { text: 'Cancel' },
];

export default () => {
    const route = useRoute();
    const taskGroupId = route.params['taskGroupId'];
    const taskGroup = useSelector(state => state.taskGroups.mapById[taskGroupId]);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.mapByGroupId[taskGroupId]) || [];
    const settingsActionSheetRef = useRef();

    if (!taskGroup) {
        navigation.pop();
        return null;
    }

    const handleChangeTask = changes => dispatch(changeTask(changes));
    const handleDeleteTask = taskId => dispatch(deleteTask(taskId));
    const handleDeleteTaskGroup = () => dispatch(deleteTaskGroup(taskGroupId));

    return (
        <Container>
            <Content>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <View>
                        <ScreenSection
                            title="INTERVAL"
                            toolbar={[
                                {
                                    icon: 'ellipsis-v',
                                    action: () => settingsActionSheetRef.current.show(),
                                }
                            ]}>

                            <IntervalLarge
                                intervalFrom={taskGroup.intervalFrom}
                                duration={taskGroup.duration}
                                onIntervalFromChange={() => navigation.push(Routes.TaskGroupIntervalFrom, { taskGroupId: taskGroupId })}
                                onDurationChange={() => navigation.push(Routes.TaskGroupDuration, { taskGroupId: taskGroupId })} />
                        </ScreenSection>

                        <ScreenSection title="TASKS">
                            {tasks.map(task =>
                                <View key={task.id} style={{ marginBottom: 32 }}>
                                    <TaskEditor task={task} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
                                </View>)}
                        </ScreenSection>

                        <ActionSheet
                            ref={settingsActionSheetRef}
                            title={<Text style={{ color: 'black' }}>Settings</Text>}
                            options={settingsCommands.map(t => t.text)}
                            cancelButtonIndex={1}
                            onPress={(commandIndex) => {
                                if (commandIndex === 0) {
                                    handleDeleteTaskGroup();
                                }
                            }} />
                    </View>
                </ScrollView>
            </Content>
        </Container>
    );
};