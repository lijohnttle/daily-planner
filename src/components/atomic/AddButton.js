import React from 'react';
import { Button, Icon } from 'native-base';
import variables from '../../theme/variables/custom';

export default ({ action }) => {
    return (
        <Button
            primary
            style={{
                position: 'absolute',
                right: 16,
                bottom: 16,
                width: 70,
                height: 70,
                borderRadius: 35,
                padding: 0,
                alignContent: 'center',
                justifyContent: 'center',
            }}
            onPress={action}>
            <Icon type="FontAwesome" name="plus" style={{ color: variables.textColor }} />
        </Button>
    );
};