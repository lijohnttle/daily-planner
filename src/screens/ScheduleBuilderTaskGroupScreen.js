import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Container, Content, View } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Interval } from '../components/scheduleBuilder/taskGroup/Interval';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTaskGroup } from '../ducks/taskGroups';

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

    return (
        <Container>
            <Content>
                <SafeAreaView>
                    <ScrollView contentInsetAdjustmentBehavior="automatic">
                        <View>
                            <Interval taskGroup={taskGroup} deleteTaskGroup={() => dispatch(deleteTaskGroup(taskGroupId))} />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Content>
        </Container>
    );
};