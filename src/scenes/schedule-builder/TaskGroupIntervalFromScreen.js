import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content, View, Text, CheckBox, ListItem, Body } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { TimestampEditor } from '../../components/medium';
import { useDebouncer } from '../../utils/debounce';
import { changeTaskGroup } from '../../ducks/taskGroups';

const styles = StyleSheet.create({
    root: {
        margin: 8,
        paddingTop: 16,
        flex: 1,
    },
});

export default () => {
    const route = useRoute();
    const taskGroupId = route.params['taskGroupId'];
    const intervalFromMs = useSelector(state => state.taskGroups.mapById[taskGroupId].intervalFrom);
    const dispatch = useDispatch();
    const [intervalFrom, setIntervalFrom] = useState(intervalFromMs);
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
    }, [intervalFrom]);

    useEffect(() => {
        if (shouldSave) {
            setShouldSave(false);

            dispatch(changeTaskGroup({ id: taskGroupId, intervalFrom: intervalFrom }));
        }
    }, [shouldSave]);

    return (
        <Container>
            <Content contentContainerStyle={{ flex: 1 }}>
                <View style={styles.root}>
                    <TimestampEditor
                        timestampMs={intervalFrom}
                        onChangeTimestamp={change => setIntervalFrom(t => change(t))} />
                </View>
            </Content>
        </Container>
    );
};