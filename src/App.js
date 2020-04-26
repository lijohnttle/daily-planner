import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigators/RootNavigator';
import { StyleProvider } from 'native-base';
import getTheme from './theme/components/index';
import custom from './theme/variables/custom';
import configureStore from './store/configureStore';
import loadState from './store/initialState';

const store = configureStore(loadState());

const App: () => React$Node = () => {
    return (
        <StoreProvider store={store}>
            <StyleProvider style={getTheme(custom)}>
                <>
                    <StatusBar barStyle="dark-content" hidden={true} />
                    
                    <NavigationContainer>
                        <RootNavigator />
                    </NavigationContainer>
                </>
            </StyleProvider>
        </StoreProvider>
    );
};

export default App;