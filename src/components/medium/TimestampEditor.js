import React from 'react';
import { View } from 'native-base';
import { NumberSpinner } from '../atomic';
import { pad, getHours, getMinutes, incrementHours, decrementHours, incrementMinutes, decrementMinutes } from '../../utils/dateTimeHelper';

export default ({ timestampMs, onChangeTimestamp, disabled }) => {
    const hours = getHours(timestampMs);
    const minutes = getMinutes(timestampMs);

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <NumberSpinner
                disabled={disabled}
                style={{ marginRight: 16 }}
                label="Hours"
                value={hours}
                displayValueConverter={pad}
                valueStyle={{ paddingVertical: 48 }}
                size={48}
                onValueUp={() => onChangeTimestamp(incrementHours)}
                onValueDown={() => onChangeTimestamp(decrementHours)} />
            <NumberSpinner
                disabled={disabled}
                style={{ marginLeft: 16 }}
                label="Minutes"
                value={minutes}
                valueStyle={{ paddingVertical: 48 }}
                displayValueConverter={pad}
                size={48}
                onValueUp={() => onChangeTimestamp(incrementMinutes)}
                onValueDown={() => onChangeTimestamp(decrementMinutes)} />
        </View>
    );
};