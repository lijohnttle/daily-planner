import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import variables from '../../../theme/variables/custom';
import ScheduleBuilderRoutes from '../../../navigators/ScheduleBuilderRoutes';

const styles = StyleSheet.create({
    root: {
        margin: 8,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: variables.padding,
    },
    header: {
        color: variables.disabledTextColor,
        textTransform: 'uppercase',
    },
    intervalContainer: {
        flexDirection: 'row',
    },
    intervalPartButton: {
        flex: 1,
        flexDirection: 'column',
        height: null,
    },
    intervalLabel: {
        color: variables.disabledTextColor,
        textTransform: 'uppercase',
        alignSelf: 'flex-start',
    },
    intervalValue: {
        color: variables.textColor,
        fontSize: variables.fontSizeH1,
        marginTop: 12,
        marginBottom: 12,
    }
});

export const Interval = ({ taskGroup }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.root}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>
                    INTERVAL
                </Text>

                <Button light onPress={() => navigation.push(ScheduleBuilderRoutes.TaskGroupMenu, { taskGroupId: taskGroup.id })}>
                    <Icon name="cog" type="FontAwesome" style={{ color: variables.textColor }} />
                </Button>
            </View>

            <View style={styles.intervalContainer}>
                <Button light style={[styles.intervalPartButton, { marginRight: 1 }]}>
                    <Text style={styles.intervalLabel}>
                        From
                    </Text>
                    <Text style={styles.intervalValue}>
                        {taskGroup.intervalFrom}
                    </Text>
                </Button>
                <Button light style={[styles.intervalPartButton, { marginLeft: 1 }]}>
                    <Text style={styles.intervalLabel}>
                        From
                    </Text>
                    <Text style={styles.intervalValue}>
                        {taskGroup.intervalTo}
                    </Text>
                </Button>
            </View>
        </View>
    );
};