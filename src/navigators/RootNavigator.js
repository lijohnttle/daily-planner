import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActiveTasks } from '../screens/ActiveTasks';
import RootRoutes from './RootRoutes';

const Stack = createStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={RootRoutes.ActiveLinks}
            headerMode="screen"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen
                name={RootRoutes.ActiveLinks}
                component={ActiveTasks} />
        </Stack.Navigator>
    )
};

export { RootNavigator };