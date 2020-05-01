import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Container, Content, View, Icon, Button, Text } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import variables from '../theme/variables/custom';
import { deleteTask } from '../ducks/tasks';

const styles = StyleSheet.create({
    root: {
        margin: 8,
    },
    deleteButton: {
        justifyContent: 'flex-start',
        paddingLeft: 8,
        paddingRight: 8,
        height: 48,
    },
});

export const ScheduleBuilderTaskMenuScreen = () => {
    const route = useRoute();
    const taskId = route.params['taskId'];
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleDeleteTask = () => {
        dispatch(deleteTask(taskId));
        
        navigation.pop();
    };

    return (
        <Container>
            <Content>
                <SafeAreaView>
                    <ScrollView contentInsetAdjustmentBehavior="automatic">
                        <View style={styles.root}>
                            <Button
                                danger
                                style={styles.deleteButton}
                                onPress={handleDeleteTask}>
                                <Icon type="FontAwesome" name="trash" style={{ color: variables.textColor }} />
                                <Text style={{ color: variables.textColor }}>DELETE</Text>
                            </Button>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Content>
        </Container>
    );
};