import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content, View } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actionsheet'
import { ScreenSection, IntervalLarge } from '../../components/medium';
import { Text } from '../../components/atomic';
import { TaskEditor } from '../../components/complex';
import variables from '../../theme/variables/custom';
import { changeTask, deleteTask, moveTaskUp, moveTaskDown } from '../../ducks/tasks';
import { deleteTaskGroup } from '../../ducks/taskGroups';
import Routes from '../../navigation/schedule-builder-routes';

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
    const tasks = (useSelector(state => state.tasks.mapByGroupId[taskGroupId]) || []).sort((task1, task2) => task1.order - task2.order);
    const settingsActionSheetRef = useRef();

    if (!taskGroup) {
        navigation.pop();
        return null;
    }

    tasks.forEach(t => console.log(t.name));
    console.log("")

    const handleChangeTask = (changes) => dispatch(changeTask(changes));
    const handleDeleteTask = (taskId) => dispatch(deleteTask(taskId));
    const handleDeleteTaskGroup = () => dispatch(deleteTaskGroup(taskGroupId));
    const handleMoveTaskUp = (taskId) => dispatch(moveTaskUp(taskId));
    const handleMoveTaskDown = (taskId) => dispatch(moveTaskDown(taskId));

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
                            {tasks.map((task, i) =>
                                <View key={task.id} style={{ marginBottom: 16, borderBottomColor: variables.brandLight, borderBottomWidth: 1, paddingBottom: 16 }}>
                                    <TaskEditor
                                        task={task}
                                        canMoveUp={i > 0}
                                        canMoveDown={i < tasks.length - 1}
                                        onChangeTask={handleChangeTask}
                                        onDeleteTask={handleDeleteTask}
                                        onMoveUp={handleMoveTaskUp}
                                        onMoveDown={handleMoveTaskDown} />
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