import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content, View, Text, CheckBox, ListItem, Body } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { NumberSpinner } from '../components/common/NumberSpinner';
import { pad, convertHoursAndMinutesToMs } from '../utils/dateTimeHelper';
import { useDebouncer } from '../utils/debounce';
import { changeTask } from '../ducks/tasks';

const styles = StyleSheet.create({
    root: {
        margin: 8,
        paddingTop: 16,
        flex: 1,
    },
    spinnerValue: {
        paddingVertical: 48,
    },
});

export const ScheduleBuilderTaskDurationScreen = () => {
    const route = useRoute();
    const taskId = route.params['taskId'];
    const taskDuration = useSelector(state => state.tasks.mapById[taskId].duration);
    const dispatch = useDispatch();
    const [hours, setHours] = useState(taskDuration ? Math.floor(taskDuration / 1000 / 60 / 60) : 0);
    const [minutes, setMinutes] = useState(taskDuration ? Math.floor((taskDuration / 1000 / 60) % 60) : 0);
    const [hasDuration, setHasDuration] = useState(!!taskDuration);
    const [shouldSave, setShouldSave] = useState(false);
    const saveDebouncer = useDebouncer(() => setShouldSave(true), 300);
    const loaded = useRef(false);

    useEffect(() => {
        if (loaded.current) {
            saveDebouncer();
        }
        else {
            loaded.current = true;
        }
    }, [hours, minutes, hasDuration]);

    useEffect(() => {
        if (shouldSave) {
            setShouldSave(false);

            if (hasDuration) {
                dispatch(changeTask({ id: taskId, duration: convertHoursAndMinutesToMs(hours, minutes) }));
            }
            else {
                dispatch(changeTask({ id: taskId, duration: null }));
            }
        }
    }, [shouldSave]);

    return (
        <Container>
            <Content contentContainerStyle={{ flex: 1 }}>
                <View style={styles.root}>

                    <View style={{ marginBottom: 48 }}>
                        <ListItem onPress={() => setHasDuration(t => !t)}>
                            <CheckBox checked={hasDuration} style={{ color: 'red' }} onPress={() => setHasDuration(t => !t)} />
                            <Body>
                                <Text>Has duration</Text>
                            </Body>
                        </ListItem>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <NumberSpinner
                            disabled={!hasDuration}
                            style={{ marginRight: 16 }}
                            label="Hours"
                            value={hours}
                            displayValueConverter={pad}
                            valueStyle={styles.spinnerValue}
                            size={48}
                            onValueUp={() => setHours(t => t < 23 ? t + 1 : 0)}
                            onValueDown={() => setHours(t => t > 0 ? t - 1 : 23)} />
                        <NumberSpinner
                            disabled={!hasDuration}
                            style={{ marginLeft: 16 }}
                            label="Minutes"
                            value={minutes}
                            valueStyle={styles.spinnerValue}
                            displayValueConverter={pad}
                            size={48}
                            onValueUp={() => setMinutes(t => t < 59 ? t + 1 : 0)}
                            onValueDown={() => setMinutes(t => t > 0 ? t - 1 : 59)} />
                    </View>
                </View>
            </Content>
        </Container>
    );
};