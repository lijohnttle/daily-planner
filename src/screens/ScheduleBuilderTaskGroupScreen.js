import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content, View } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Interval, TasksList } from '../components/scheduleBuilder/taskGroup';
import { changeTask } from '../ducks/tasks';

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
                        <View style={styles.intervalContainer}>
                            <Interval taskGroup={taskGroup} />
                        </View>

                        <TasksList tasks={tasks} onChangeTask={handleChangeTask} />
                    </View>
                </ScrollView>
            </Content>
        </Container>
    );
};