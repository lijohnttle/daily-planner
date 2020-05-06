import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content, View, Button, Icon } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ScreenSection, IntervalLarge } from '../../components/medium';
import { TasksList } from '../../components/scheduleBuilder/taskGroup';
import { changeTask } from '../../ducks/tasks';
import { Routes } from '../../navigation/schedule-builder-navigator';

export default () => {
    const route = useRoute();
    const taskGroupId = route.params['taskGroupId'];
    const taskGroup = useSelector(state => state.taskGroups.mapById[taskGroupId]);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.mapByGroupId[taskGroupId]) || [];

    if (!taskGroup) {
        navigation.pop();
        return null;
    }

    const handleChangeTask = changes => dispatch(changeTask(changes));

    return (
        <Container>
            <Content>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <View>
                        <ScreenSection
                            title="INTERVAL"
                            toolbar={[
                                {
                                    icon: 'cog',
                                    action: () => navigation.push(Routes.TaskGroupMenu, { taskGroupId: taskGroup.id }),
                                }
                            ]}>
                                
                            <IntervalLarge intervalFrom={taskGroup.intervalFrom} intervalTo={taskGroup.intervalFrom + taskGroup.duration} />
                        </ScreenSection>

                        <ScreenSection title="TASKS">
                            <TasksList tasks={tasks} onChangeTask={handleChangeTask} />
                        </ScreenSection>
                    </View>
                </ScrollView>
            </Content>
        </Container>
    );
};