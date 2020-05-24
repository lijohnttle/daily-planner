import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content, View, Button, Icon } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actionsheet'
import { ScreenSection, IntervalLarge } from '../../components/medium';
import { Text, AddButton } from '../../components/atomic';
import { TaskEditor } from '../../components/complex';
import variables from '../../theme/variables/custom';
import { changeTask, deleteTask, moveTaskUp, moveTaskDown, addTask } from '../../ducks/tasks';
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
    const tasks = useSelector(state => state.tasks.mapByGroupId[taskGroupId] || []);
    const [loaded, setLoaded] = useState(false);
    const [maxTaskId, setMaxTaskId] = useState(-1);
    const settingsActionSheetRef = useRef();
    const contentElementRef = useRef();

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        const newMaxTaskId = tasks.reduce((maxId, task) => Math.max(maxId, task.id), -1);

        if (loaded && contentElementRef.current) {
            if (maxTaskId < newMaxTaskId) {
                setMaxTaskId(newMaxTaskId);

                contentElementRef.current._root.scrollToEnd();
            }
        }
        else {
            setMaxTaskId(newMaxTaskId);
        }
    }, [tasks]);

    if (!taskGroup) {
        navigation.pop();
        return null;
    }

    const handleChangeTask = (changes) => dispatch(changeTask(changes));
    const handleDeleteTask = (taskId) => dispatch(deleteTask(taskId));
    const handleDeleteTaskGroup = () => dispatch(deleteTaskGroup(taskGroupId));
    const handleMoveTaskUp = (taskId) => dispatch(moveTaskUp(taskId));
    const handleMoveTaskDown = (taskId) => dispatch(moveTaskDown(taskId));
    const handleAddTask = () => dispatch(addTask(taskGroupId));

    return (
        <Container>
            <View style={{ flex: 1 }}>
                <Content ref={t => contentElementRef.current = t}>
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
                </Content>

                <AddButton action={handleAddTask} />
            </View>
        </Container>
    );
};