import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text } from 'react-native';
import { Container, Header, Content, Body, Title } from 'native-base';

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
                        <Title>Hello</Title>
                    </Body>
                </Header>

                <Content>
                    <SafeAreaView>
                        <ScrollView
                            contentInsetAdjustmentBehavior="automatic">
                            <View>
                                
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </Content>
            </Container>
        );
    }
}

export { ActiveTasks };