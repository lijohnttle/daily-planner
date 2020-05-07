import React, { Children } from 'react';
import { Button } from 'native-base';
import Text from './Text';

export default ({ light=true, dark=false, flat=false, narrow=false, bottomGutter=false, onPress, style, children }) => {
    return (
        <Button
            light={light}
            dark={dark}
            style={[{
                flexDirection: 'row',
                alignItems: 'center',
                height: narrow ? 40 : 48,
                marginBottom: bottomGutter ? 2 : 0,
                elevation: flat ? 0 : 2,
                padding: 0,
                paddingLeft: 0,
                paddingHorizontal: 0,
                paddingStart: 0,
            }, style]}
            onPress={onPress}>

            {Children.map(children, (child) => typeof child === 'string' ? <Text>{child}</Text> : child)}
        </Button>
    );
};