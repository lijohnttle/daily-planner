import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Body, Title, Left, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import variables from '../theme/variables/custom';
import { ScheduleBuilderDaysScreen } from '../screens/ScheduleBuilderDaysScreen';
import { ScheduleBuilderTaskGroupsScreen } from '../screens/ScheduleBuilderTaskGroupsScreen';
import ScheduleBuilderRoutes from './ScheduleBuilderRoutes';

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1
    },
});

const Stack = createStackNavigator();

export const ScheduleBuilderNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName={ScheduleBuilderRoutes.DaysList}
            headerMode="float">
            <Stack.Screen
                name={ScheduleBuilderRoutes.DaysList}
                component={ScheduleBuilderDaysScreen}
                options={{
                    title: 'Daily Planner',
                    animationEnabled: false,
                    headerStyle: {
                        backgroundColor: variables.headerStyle,
                    },
                    header: (props) => {
                        return (
                            <Header style={styles.header}>
                                <Left>
                                    <Button light transparent onPress={navigation.openDrawer}>
                                        <Icon name='bars' color={variables.textColor} size={24} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Title>{props.scene.descriptor.options.title}</Title>
                                </Body>
                            </Header>

                        );
                    },
                }} />
                <Stack.Screen
                    name={ScheduleBuilderRoutes.TaskGroupsList}
                    component={ScheduleBuilderTaskGroupsScreen}
                    options={{
                        title: 'Daily Planner',
                        animationEnabled: false,
                        headerStyle: {
                            backgroundColor: variables.headerStyle,
                        },
                        header: (props) => {
                            return (
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
                        },
                }} />
        </Stack.Navigator>
    );
};