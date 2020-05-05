import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Body, Title, Left, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import variables from '../theme/variables/custom';
import { ScheduleBuilderScreen } from '../screens/ScheduleBuilderScreen';
import { ScheduleBuilderDayScreen } from '../screens/ScheduleBuilderDayScreen';
import { ScheduleBuilderTaskGroupScreen } from '../screens/ScheduleBuilderTaskGroupScreen';
import { ScheduleBuilderTaskMenuScreen } from '../screens/ScheduleBuilderTaskMenuScreen';
import { ScheduleBuilderTaskGroupMenuScreen } from '../screens/ScheduleBuilderTaskGroupMenuScreen';
import { ScheduleBuilderTaskDurationScreen } from '../screens/ScheduleBuilderTaskDurationScreen';

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1
    },
});

export const Routes = {
    DaysList: 'DaysList',
    Day: 'TaskGroupsList',
    TaskGroup: 'TaskGroup',
    TaskMenu: 'TaskMenu',
    TaskGroupMenu: 'TaskGroupMenu',
    TaskDurationPicker: 'TaskDurationPicker',
};

const Stack = createStackNavigator();

const getHeaderWithMenuButton = props => (
    <Header style={styles.header}>
        <Left>
            <Button light style={{ elevation: 0 }} onPress={props.navigation.openDrawer}>
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
            <Button light style={{ elevation: 0 }} onPress={() => props.navigation.pop()}>
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
            initialRouteName={Routes.DaysList}
            headerMode="float">
            <Stack.Screen
                name={Routes.DaysList}
                component={ScheduleBuilderScreen}
                options={getScreenOptions(getHeaderWithMenuButton)} />
            <Stack.Screen
                name={Routes.Day}
                component={ScheduleBuilderDayScreen}
                options={getScreenOptions(getHeaderWithBackButton)} />
            <Stack.Screen
                name={Routes.TaskGroup}
                component={ScheduleBuilderTaskGroupScreen}
                options={getScreenOptions(getHeaderWithBackButton)} />
            <Stack.Screen
                name={Routes.TaskMenu}
                component={ScheduleBuilderTaskMenuScreen}
                options={getScreenOptions(getHeaderWithBackButton)} />
            <Stack.Screen
                name={Routes.TaskGroupMenu}
                component={ScheduleBuilderTaskGroupMenuScreen}
                options={getScreenOptions(getHeaderWithBackButton)} />
            <Stack.Screen
                name={Routes.TaskDurationPicker}
                component={ScheduleBuilderTaskDurationScreen}
                options={getScreenOptions(getHeaderWithBackButton)} />
        </Stack.Navigator>
    );
};