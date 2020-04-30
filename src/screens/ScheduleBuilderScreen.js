import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Container, Header, Content, Body, Title, Left, Button, View, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import variables from '../theme/variables/custom';

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1
    },
});

export const ScheduleBuilderScreen = ({ navigation }) => {
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
                            <Text>Schedule Builder</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Content>
        </Container>
    );
};