import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content, View } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ButtonListItem, Timestamp, AddButton } from '../../components/atomic';
import { ScreenSection } from '../../components/medium';
import { addTaskGroup } from '../../ducks/taskGroups';
import Routes from '../../navigation/schedule-builder-routes';

export default () => {
    const route = useRoute();
    const day = route.params['day'];
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const taskGroups = useSelector(state => state.taskGroups.mapByDayId[day.id] || []);

    const handleAddTaskGroup = () => dispatch(addTaskGroup(day.id));
    
    return (
        <Container>
            <View style={{ flex: 1 }}>
                <Content>
                    <ScreenSection title={day.name}>
                        {taskGroups.map(taskGroup =>
                            <ButtonListItem key={taskGroup.id} onPress={() => navigation.push(Routes.TaskGroup, { taskGroupId: taskGroup.id })}>
                                <Timestamp timestampMs={taskGroup.intervalFrom} label="From" />
                                <Timestamp timestampMs={taskGroup.intervalFrom + taskGroup.duration} label="To" />
                            </ButtonListItem>)}
                    </ScreenSection>
                </Content>

                <AddButton action={handleAddTaskGroup} />
            </View>
        </Container>
    );
};