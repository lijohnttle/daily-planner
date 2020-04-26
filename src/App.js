import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigators/RootNavigator';
import { StyleProvider } from 'native-base';
import getTheme from './theme/components/index';
import custom from './theme/variables/custom';

const App: () => React$Node = () => {
    return (
        <StyleProvider style={getTheme(custom)}>
            <>
                <StatusBar barStyle="dark-content" hidden={true} />
                
                <NavigationContainer>
                    <RootNavigator />
                </NavigationContainer>
            </>
        </StyleProvider>
    );
};

export default App;