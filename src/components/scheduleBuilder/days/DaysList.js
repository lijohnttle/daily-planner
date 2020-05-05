import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button } from 'native-base';
import { useSelector } from 'react-redux';
import variables from '../../../theme/variables/custom';
import { Routes } from '../../../navigation/schedule-builder-navigator';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    root: {
        margin: 8,
    },
    header: {
        color: variables.disabledTextColor,
        textTransform: "uppercase",
        fontSize: variables.DefaultFontSize * 1.2,
        paddingBottom: 8,
    },
    dayButton: {
        marginTop: 2,
        marginBottom: 0,
        height: 48,
    },
});

export const DaysList = () => {
    const days = useSelector(state => state.days.list);
    const navigation = useNavigation();

    return (
        <View style={styles.root}>
            <Text style={styles.header}>
                DAYS OF THE WEEK
            </Text>

            {days.map(day => (
                <Button key={day.id} light style={styles.dayButton} onPress={() => navigation.push(Routes.Day, { day })}>
                    <Text style={{ color: variables.defaultTextColor }}>
                        {day.name}
                    </Text>
                </Button>
            ))}
        </View>
    );
};