import React from 'react';
import { View, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import variables from '../../theme/variables/custom';

const styles = StyleSheet.create({
    root: {
        marginBottom: 8
    },
    commandButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
        marginBottom: 0,
        height: 48,
    }
});

export const TaskCommands = ({ commands }) => {
    if (!commands || commands.length === 0) {
        return null;
    }

    return (
        <View style={styles.root}>
            {commands.map(command => (
                <Button key={command.text} light style={styles.commandButton} onPress={command.action}>
                    <Text style={{ color: variables.defaultTextColor }}>
                        {command.text}
                    </Text>
                </Button>
            ))}
        </View>
    );
};