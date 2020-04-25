import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActiveTasks } from './activeTasks/ActiveTasks';
import RouteNames from './RouteNames';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={RouteNames.ActiveLinks}
        headerMode="screen"
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
        }}>
        <Stack.Screen
          name={RouteNames.ActiveLinks}
          component={ActiveTasks}
          options={{
            title: "Daily Planner"
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
