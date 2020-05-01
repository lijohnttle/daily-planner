import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Container, Content, View } from 'native-base';
import { TaskGroupsList } from '../components/scheduleBuilder/TaskGroupsList';

export const ScheduleBuilderTaskGroupsScreen = () => {
    return (
        <Container>
            <Content>
                <SafeAreaView>
                    <ScrollView contentInsetAdjustmentBehavior="automatic">
                        <View>
                            <TaskGroupsList />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Content>
        </Container>
    );
};