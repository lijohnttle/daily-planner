import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import PropertyListItem from './PropertyListItem';
import { Text } from '../atomic';
import variables from '../../theme/variables/custom';

const styles = StyleSheet.create({
    itemLabelContainer: {
        height: 48,
        justifyContent: 'center',
        marginRight: 16,
    },
    itemLabel: {
        textAlign: 'right',
        color: variables.disabledTextColor,
    },
    itemContentContainer: {
        height: 48,
        justifyContent: 'center',
    },
});

export default ({ children, toolbar }) => {
    const items = React.Children.toArray(children).filter(t => t.type === PropertyListItem);

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 0 }}>
                {items.map((item, index) =>
                    <View key={index} style={[styles.itemLabelContainer, { marginTop: index > 0 ? 2 : 0 }]}>
                        <Text style={styles.itemLabel}>{item.props.label}</Text>
                    </View>)}
            </View>
            <View style={{ flex: 1 }}>
                {items.map((item, index) =>
                    <View key={index} style={[styles.itemContentContainer, { marginTop: index > 0 ? 2 : 0 }]}>
                        {React.cloneElement(item.props.children)}
                    </View>)}
            </View>
            <View style={{ flex: 0 }}>
                {toolbar}
            </View>
        </View>
    );
};