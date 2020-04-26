import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text } from 'react-native';
import { Container, Header, Content, Body, Title } from 'native-base';
import { ActiveTasksList } from '../components/activeTasks/ActiveTasksList';

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1
    },
});

class ActiveTasks extends React.Component {
    render() {
        return (
            <Container>
                <Header style={styles.header}>
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
    }
}

export { ActiveTasks };