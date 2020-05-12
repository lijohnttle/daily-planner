import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Container, Content, View } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ButtonListItem, Timestamp } from '../../components/atomic';
import { ScreenSection } from '../../components/medium';
import Routes from '../../navigation/schedule-builder-routes';

export default () => {
    const route = useRoute();
    const day = route.params['day'];
    const navigation = useNavigation();
    const taskGroups = useSelector(state => state.taskGroups.mapByDayId[day.id]) || [];
    
    return (
        <Container>
            <Content>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <ScreenSection title={day.name}>
                        {taskGroups.map(taskGroup =>
                            <ButtonListItem key={taskGroup.id} onPress={() => navigation.push(Routes.TaskGroup, { taskGroupId: taskGroup.id })}>
                                <Timestamp timestampMs={taskGroup.intervalFrom} label="From" />
                                <Timestamp timestampMs={taskGroup.intervalFrom + taskGroup.duration} label="To" />
                            </ButtonListItem>)}
                    </ScreenSection>
                </ScrollView>
            </Content>
        </Container>
    );
};