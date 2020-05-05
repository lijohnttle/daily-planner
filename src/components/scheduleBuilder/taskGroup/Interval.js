import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import ScheduleBuilderRoutes from '../../../navigators/ScheduleBuilderRoutes';
import variables from '../../../theme/variables/custom';
import { msToHHmm } from '../../../utils/dateTimeHelper';

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
        fontSize: variables.fontSizeH3,
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

                <Button
                    dark
                    style={{ height: 32, elevation: 0 }}
                    onPress={() => navigation.push(ScheduleBuilderRoutes.TaskGroupMenu, { taskGroupId: taskGroup.id })}>
                    <Icon name="cog" type="FontAwesome" style={{ color: variables.textColor, fontSize: 16 }} />
                </Button>
            </View>

            <View style={styles.intervalContainer}>
                <Button light style={[styles.intervalPartButton, { marginRight: 1 }]}>
                    <Text style={styles.intervalLabel}>
                        From
                    </Text>
                    <Text style={styles.intervalValue}>
                        {msToHHmm(taskGroup.intervalFrom)}
                    </Text>
                </Button>
                <Button light style={[styles.intervalPartButton, { marginLeft: 1 }]}>
                    <Text style={styles.intervalLabel}>
                        To
                    </Text>
                    <Text style={styles.intervalValue}>
                        {msToHHmm(taskGroup.intervalFrom + taskGroup.duration)}
                    </Text>
                </Button>
            </View>
        </View>
    );
};