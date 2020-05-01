import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Icon } from 'native-base';
import variables from '../../../theme/variables/custom';

const styles = StyleSheet.create({
    root: {
        margin: 8,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8,
    },
    header: {
        color: variables.disabledTextColor,
        textTransform: 'uppercase',
        fontSize: variables.DefaultFontSize * 1.2,
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

export const Interval = ({ taskGroup, onDeleteTaskGroup }) => {
    return (
        <View style={styles.root}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>
                    INTERVAL
                </Text>

                <Button danger onPress={onDeleteTaskGroup}>
                    <Icon name="trash" type="FontAwesome" style={{ color: variables.textColor }} />
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