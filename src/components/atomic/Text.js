import React from 'react';
import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import variables from '../../theme/variables/custom';

const styles = StyleSheet.create({
    root: {
        color: variables.textColor,
    }
});

export default (props) => {
    return (
        <Text {...props} style={[styles.root, props.style]}>
            {props.children}
        </Text>
    );
};