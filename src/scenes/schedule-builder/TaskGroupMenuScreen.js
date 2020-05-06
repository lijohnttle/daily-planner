import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Container, Content, View, Icon, Button, Text } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import variables from '../../theme/variables/custom';
import { deleteTaskGroup } from '../../ducks/taskGroups';

const styles = StyleSheet.create({
    root: {
        margin: 8,
        marginTop: 48,
    },
    deleteButton: {
        justifyContent: 'flex-start',
        paddingLeft: 8,
        paddingRight: 8,
        height: 48,
    },
});

export default () => {
    const route = useRoute();
    const taskGroupId = route.params['taskGroupId'];
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleDeleteTaskGroup = () => {
        dispatch(deleteTaskGroup(taskGroupId));
        
        navigation.pop();
    };

    return (
        <Container>
            <Content>
                <View style={styles.root}>
                    <Button
                        danger
                        style={styles.deleteButton}
                        onPress={handleDeleteTaskGroup}>
                        <Icon type="FontAwesome" name="trash" style={{ color: variables.textColor }} />
                        <Text style={{ color: variables.textColor }}>DELETE</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
};