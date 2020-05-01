import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import variables from '../../../theme/variables/custom';
import ScheduleBuilderRoutes from '../../../navigators/ScheduleBuilderRoutes';

const styles = StyleSheet.create({
    root: {
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 2,
    },
    taskGroupButton: {
        flexDirection: "row",
        alignItems: "center",
        height: 48,
    },
    intervalPart: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
    },
    intervalLabel: {
        color: variables.disabledTextColor,
    },
    intervalValue: {
        fontSize: variables.fontSizeH3,
    }
});

export const TaskGroup = ({ taskGroup }) => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.root}>
            <Button light style={styles.taskGroupButton} onPress={() => navigation.push(ScheduleBuilderRoutes.TaskGroup, { taskGroupId: taskGroup.id })}>
                <View style={styles.intervalPart}>
                    <Text style={styles.intervalLabel}>From</Text>
                    <Text style={styles.intervalValue}>{taskGroup.intervalFrom}</Text>
                </View>
                <View style={styles.intervalPart}>
                    <Text style={styles.intervalLabel}>To</Text>
                    <Text style={styles.intervalValue}>{taskGroup.intervalTo}</Text>
                </View>
            </Button>
        </View>
    );
};