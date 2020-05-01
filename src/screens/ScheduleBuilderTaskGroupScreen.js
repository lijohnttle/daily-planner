import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content, View } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Interval, TasksList } from '../components/scheduleBuilder/taskGroup';
import { deleteTaskGroup } from '../ducks/taskGroups';
import { changeTask, deleteTask } from '../ducks/tasks';

const styles = StyleSheet.create({
    intervalContainer: {
        marginBottom: 16,
    },
});

export const ScheduleBuilderTaskGroupScreen = () => {
    const route = useRoute();
    const taskGroupId = route.params['taskGroupId'];
    const taskGroup = useSelector(state => state.taskGroups.mapById[taskGroupId]);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    if (!taskGroup) {
        navigation.pop();
        return null;
    }

    const tasks = useSelector(state => state.tasks.mapByGroupId[taskGroupId]) || [];

    const handleDeleteTaskGroup = () => dispatch(deleteTaskGroup(taskGroupId));
    const handleChangeTask = changes => dispatch(changeTask(changes));
    const handleDeleteTask = taskId => dispatch(deleteTask(taskId));

    return (
        <Container>
            <Content>
                <SafeAreaView>
                    <ScrollView contentInsetAdjustmentBehavior="automatic">
                        <View>
                            <View style={styles.intervalContainer}>
                                <Interval taskGroup={taskGroup} onDeleteTaskGroup={handleDeleteTaskGroup} />
                            </View>

                            <TasksList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Content>
        </Container>
    );
};