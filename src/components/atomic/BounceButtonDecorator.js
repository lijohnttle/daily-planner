import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'native-base';

class BounceButtonDecorator extends React.Component {
    constructor(props) {
        super(props);

        this.timerId = null;
    }

    bounce = () => {
        if (!this.timerId) {
            changeBounceInterval.call(this, 250, 50, 1.3, true);
        }

        function changeBounceInterval(interval, minInterval, accelerator, initial) {
            if (initial || this.timerId) {
                clearInterval(this.timerId);

                const newInterval = Math.max(interval/accelerator, minInterval);

                this.timerId = setInterval(() => {
                    if (this.props.bounce) {
                        this.props.bounce();
                    }

                    changeBounceInterval.call(this, newInterval, minInterval, accelerator, false);
                }, newInterval);
            }
        };
    };

    stopBouncing = () => {
        clearInterval(this.timerId);
        
        this.timerId = null;
    };

    componentWillUnmount = () => {
        this.stopBouncing();
    };

    render = () => {
        const button = React.Children.only(this.props.children);

        if (button.type !== Button) {
            return null;
        }

        return (
            <>
                {React.cloneElement(button, { onLongPress: this.bounce, delayLongPress: 500, onPressOut: this.stopBouncing })}
            </>
        );
    };
}

BounceButtonDecorator.propTypes = {
    bounce: PropTypes.func,
};

export default BounceButtonDecorator;