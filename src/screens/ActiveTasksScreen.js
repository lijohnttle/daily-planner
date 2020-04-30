import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Container, Header, Content, Body, Title, Left, Button, View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActiveTasksList } from '../components/activeTasks/ActiveTasksList';
import variables from '../theme/variables/custom';

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1
    },
});

export const ActiveTasksScreen = ({ navigation }) => {
    return (
        <Container>
            <Header style={styles.header}>
                <Left>
                    <Button light transparent onPress={navigation.openDrawer}>
                        <Icon name='bars' color={variables.textColor} size={24} />
                    </Button>
                </Left>
                <Body>
                    <Title>Daily Planner</Title>
                </Body>
            </Header>

            <Content>
                <SafeAreaView>
                    <ScrollView contentInsetAdjustmentBehavior="automatic">
                        <View>
                            <ActiveTasksList />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Content>
        </Container>
    );
};