import React, { Children } from 'react';
import { Button } from 'native-base';
import Text from './Text';

export default ({ bottomGutter, onPress, children }) => {
    return (
        <Button
            light
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 48,
                marginBottom: bottomGutter ? 2 : 0,
            }}
            onPress={onPress}>

            {Children.map(children, (child) => typeof child === 'string' ? <Text>{child}</Text> : child)}
        </Button>
    );
};