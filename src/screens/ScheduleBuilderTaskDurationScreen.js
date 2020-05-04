import React, { useState, useEffect } from 'react';
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
    
    const valueDebouncer = useDebouncer();

    const handleEndTimeChanging = () => {
        dispatch(changeTask({ id: taskId, duration: convertHoursAndMinutesToMs(hours, minutes) }));
    };

    const handleChangeHasDuration = () => {
        setHasDuration(!hasDuration);
        
        dispatch(changeTask({ id: taskId, duration: null }));
    };

    return (
        <Container>
            <Content contentContainerStyle={{ flex: 1 }}>
                <View style={styles.root}>

                    <View style={{ marginBottom: 48 }}>
                        <ListItem onPress={handleChangeHasDuration}>
                            <CheckBox checked={hasDuration} style={{ color: 'red' }} />
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
                            minValue={0}
                            maxValue={23}
                            size={48}
                            onValueChange={setHours}
                            onEndValueChanging={() => valueDebouncer(handleEndTimeChanging, 500)} />
                        <NumberSpinner
                            disabled={!hasDuration}
                            style={{ marginLeft: 16 }}
                            label="Minutes"
                            value={minutes}
                            valueStyle={styles.spinnerValue}
                            displayValueConverter={pad}
                            minValue={0}
                            maxValue={59}
                            size={48}
                            onValueChange={setMinutes}
                            onEndValueChanging={() => valueDebouncer(handleEndTimeChanging, 500)} />
                    </View>
                </View>
            </Content>
        </Container>
    );
};