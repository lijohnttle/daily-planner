import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Body, Title, Left, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import variables from '../theme/variables/custom';
import { DaysListScreen, DayScreen, TaskGroupScreen, DurationScreen } from '../scenes/schedule-builder';

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
                component={DaysListScreen}
                options={getScreenOptions(getHeaderWithMenuButton)} />
            <Stack.Screen
                name={Routes.Day}
                component={DayScreen}
                options={getScreenOptions(getHeaderWithBackButton)} />
            <Stack.Screen
                name={Routes.TaskGroup}
                component={TaskGroupScreen}
                options={getScreenOptions(getHeaderWithBackButton)} />
            <Stack.Screen
                name={Routes.TaskDurationPicker}
                component={DurationScreen}
                options={getScreenOptions(getHeaderWithBackButton)} />
        </Stack.Navigator>
    );
};