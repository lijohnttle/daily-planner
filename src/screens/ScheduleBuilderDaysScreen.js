import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Container, Content, View } from 'native-base';
import { DaysList } from '../components/scheduleBuilder/DaysList';

export const ScheduleBuilderDaysScreen = () => {
    return (
        <Container>
            <Content>
                <SafeAreaView>
                    <ScrollView contentInsetAdjustmentBehavior="automatic">
                        <View>
                            <DaysList />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Content>
        </Container>
    );
};