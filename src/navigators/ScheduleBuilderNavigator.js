import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Body, Title, Left, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import variables from '../theme/variables/custom';
import ScheduleBuilderRoutes from './ScheduleBuilderRoutes';
import { ScheduleBuilderScreen } from '../screens/ScheduleBuilderScreen';
import { ScheduleBuilderDayScreen } from '../screens/ScheduleBuilderDayScreen';
import { ScheduleBuilderTaskGroupScreen } from '../screens/ScheduleBuilderTaskGroupScreen';
import { ScheduleBuilderTaskMenuScreen } from '../screens/ScheduleBuilderTaskMenuScreen';
import { ScheduleBuilderTaskGroupMenuScreen } from '../screens/ScheduleBuilderTaskGroupMenuScreen';

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1
    },
});

const Stack = createStackNavigator();

const getHeaderWithMenuButton = props => (
    <Header style={styles.header}>
        <Left>
            <Button light transparent onPress={props.navigation.openDrawer}>
                <Icon name='bars' color={variables.textColor} size={24} />
            </Button>
        </Left>
        <Body>
            <Title>{props.scene.descriptor.options.title}</Title>
        </Body>
    </Header>
);

const getHeaderWithBackButton = props => (
    <Header style={styles.header}>
        <Left>
            <Button light transparent onPress={() => props.navigation.pop()}>
                <Icon name='chevron-left' color={variables.textColor} size={24} />
            </Button>
        </Left>
        <Body>
            <Title>{props.scene.descriptor.options.title}</Title>
        </Body>
    </Header>
);

const getScreenOptions = header => {
    return {
        title: 'Schedule Builder',
        animationEnabled: false,
        headerStyle: {
            backgroundColor: variables.headerStyle,
        },
        header: header,
    };
};

export const ScheduleBuilderNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={ScheduleBuilderRoutes.DaysList}
            headerMode="float">
            <Stack.Screen
                name={ScheduleBuilderRoutes.DaysList}
                component={ScheduleBuilderScreen}
                options={getScreenOptions(getHeaderWithMenuButton)} />
            <Stack.Screen
                name={ScheduleBuilderRoutes.Day}
                component={ScheduleBuilderDayScreen}
                options={getScreenOptions(getHeaderWithBackButton)} />
            <Stack.Screen
                name={ScheduleBuilderRoutes.TaskGroup}
                component={ScheduleBuilderTaskGroupScreen}
                options={getScreenOptions(getHeaderWithBackButton)} />
            <Stack.Screen
                name={ScheduleBuilderRoutes.TaskMenu}
                component={ScheduleBuilderTaskMenuScreen}
                options={getScreenOptions(getHeaderWithBackButton)} />
            <Stack.Screen
                name={ScheduleBuilderRoutes.TaskGroupMenu}
                component={ScheduleBuilderTaskGroupMenuScreen}
                options={getScreenOptions(getHeaderWithBackButton)} />
        </Stack.Navigator>
    );
};