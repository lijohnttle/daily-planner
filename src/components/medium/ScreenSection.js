import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Button, Icon } from 'native-base';
import { Text } from '../atomic';
import variables from '../../theme/variables/custom';
import { screenSectionSpacing } from '../../styles/mixins';

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 8,
        backgroundColor: variables.brandPrimary,
        height: 48,
        elevation: 7,
    },
    title: {
        textTransform: 'uppercase',
        fontSize: variables.fontSizeH3,
    },
});

export default ({ title, titleStyle, contentContainerStyle, toolbar, children }) => {
    return (
        <View>
            <View style={styles.titleContainer}>
                {title !== null && typeof title !== 'undefined'
                    ? <Text style={[styles.title, titleStyle]}>{title}</Text>
                    : null}
                {toolbar && toolbar.length > 0
                    ? toolbar.map((command, index) => (
                        <Button
                            key={index}
                            primary
                            style={{ height: 48, elevation: 0 }}
                            onPress={command.action}>
                            <Icon name={command.icon} type="FontAwesome" style={{ color: variables.textColor, fontSize: 16 }} />
                        </Button>
                    ))
                    : null}
            </View>
            
            <View style={[{...screenSectionSpacing()}, contentContainerStyle]}>
                {children}
            </View>
        </View>
    );
};

