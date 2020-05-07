import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import { Container, Content } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ButtonListItem } from '../../components/atomic';
import { ScreenSection } from '../../components/medium';
import { Routes } from '../../navigation/schedule-builder-navigator';

export default () => {
    const days = useSelector(state => state.days.list);
    const navigation = useNavigation();
    
    return (
        <Container>
            <Content>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <ScreenSection title="DAYS OF THE WEEK">
                        {days.map((day, index) => 
                            <ButtonListItem
                                key={day.id}
                                bottomGutter={index < days.length - 1}
                                onPress={() => navigation.push(Routes.Day, { day })}>
                                {day.name.toUpperCase()}
                            </ButtonListItem>)}
                    </ScreenSection>
                </ScrollView>
            </Content>
        </Container>
    );
};