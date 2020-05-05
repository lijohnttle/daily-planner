import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Icon } from 'native-base';
import variables from '../../theme/variables/custom';
import { BounceButtonDecorator } from './BounceButtonDecorator';

const styles = StyleSheet.create({
    root: {
        alignItems: 'stretch',
    },
    label: {
        color: variables.disabledTextColor,
        marginBottom: 8,
        textAlign: 'center',
    },
    value: {
        marginVertical: 8,
        textAlign: 'center',
    },
    upDownButton: {
        padding: 8, 
        height: null,
    }
});

export const NumberSpinner = ({
    disabled,
    label,
    size,
    labelStyle,
    style,
    value,
    displayValueConverter,
    valueStyle,
    onValueUp,
    onValueDown,
    valueUpButtonStyle,
    valueDownButtonStyle,
    }) => {

    return (
        <View style={[styles.root, style]}>
            <Text style={[styles.label, labelStyle]}>{label}</Text>

            <BounceButtonDecorator bounce={onValueUp}>
                <Button light onPress={onValueUp} style={[styles.upDownButton, valueUpButtonStyle]} disabled={disabled}>
                    <Icon name="chevron-up" type="FontAwesome" style={{ color: variables.textColor, fontSize: size }} />
                </Button>
            </BounceButtonDecorator>
            <Text style={[styles.value, { fontSize: size, backgroundColor: disabled ? variables.buttonDisabledBg : variables.brandLight }, valueStyle]}>
                {displayValueConverter ? displayValueConverter(value) : value}
            </Text>
            <BounceButtonDecorator bounce={onValueDown}>
                <Button light onPress={onValueDown} style={[styles.upDownButton, valueDownButtonStyle]} disabled={disabled}>
                    <Icon name="chevron-down" type="FontAwesome" style={{ color: variables.textColor, fontSize: size }} />
                </Button>
            </BounceButtonDecorator>
        </View>
    );
};