import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content, View, Text, CheckBox, ListItem, Body } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { TimestampEditor } from '../../components/medium';
import { useDebouncer } from '../../utils/debounce';
import { changeTask } from '../../ducks/tasks';

const styles = StyleSheet.create({
    root: {
        margin: 8,
        paddingTop: 16,
        flex: 1,
    },
});

export default () => {
    const route = useRoute();
    const taskId = route.params['taskId'];
    const taskDuration = useSelector(state => state.tasks.mapById[taskId].duration);
    const dispatch = useDispatch();
    const [duration, setDuration] = useState(taskDuration ? taskDuration : 0);
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
    }, [duration, hasDuration]);

    useEffect(() => {
        if (shouldSave) {
            setShouldSave(false);

            if (hasDuration) {
                dispatch(changeTask({ id: taskId, duration: duration }));
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
                            <CheckBox checked={!hasDuration} style={{ color: 'red' }} onPress={() => setHasDuration(t => !t)} />
                            <Body>
                                <Text>Empty</Text>
                            </Body>
                        </ListItem>
                    </View>

                    <TimestampEditor
                        disabled={!hasDuration}
                        timestampMs={duration}
                        onChangeTimestamp={change => setDuration(t => change(t))} />
                </View>
            </Content>
        </Container>
    );
};