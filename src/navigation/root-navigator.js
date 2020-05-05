import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ActiveTasksScreen } from '../screens/ActiveTasksScreen';
import { ScheduleBuilderNavigator } from './schedule-builder-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import variables from '../theme/variables/custom';

export const Routes = {
    ActiveTasks: 'ActiveTasks',
    ScheduleBuilder: 'ScheduleBuilder',
};

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName={Routes.ActiveTasks}
            screenOptions={{
                headerShown: false
            }}
            drawerStyle={{
                backgroundColor: variables.containerBgColor,
            }}
            drawerContentOptions={{
                inactiveTintColor: variables.textColor,
                activeTintColor: variables.textColor,
            }}>
            <Drawer.Screen
                name={Routes.ActiveTasks}
                component={ActiveTasksScreen}
                options={{
                    drawerIcon: ({ size, color }) => <Icon name="home" size={size} color={color} />,
                    title: 'HOME'
                }} />
            <Drawer.Screen
                name={Routes.ScheduleBuilder}
                component={ScheduleBuilderNavigator}
                options={{
                    drawerIcon: ({ size, color }) => <Icon name="edit" size={size} color={color} />,
                    title: 'SCHEDULE BUILDER',
                    swipeEnabled: false,
                }} />
        </Drawer.Navigator>
    )
};

export { RootNavigator };