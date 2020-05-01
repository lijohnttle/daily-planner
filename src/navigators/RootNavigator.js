import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ActiveTasksScreen } from '../screens/ActiveTasksScreen';
import { ScheduleBuilderNavigator } from './ScheduleBuilderNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import variables from '../theme/variables/custom';
import RootRoutes from './RootRoutes';

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName={RootRoutes.ActiveTasks}
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
                name={RootRoutes.ActiveTasks}
                component={ActiveTasksScreen}
                options={{
                    drawerIcon: ({ size, color }) => <Icon name="home" size={size} color={color} />,
                    title: 'HOME'
                }} />
            <Drawer.Screen
                name={RootRoutes.ScheduleBuilder}
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