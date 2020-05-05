import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation/root-navigator';
import { StyleProvider } from 'native-base';
import getTheme from './theme/components/index';
import custom from './theme/variables/custom';
import configureStore from './store/configureStore';

const store = configureStore();

const App: () => React$Node = () => {
    return (
        <StoreProvider store={store}>
            <StyleProvider style={getTheme(custom)}>
                <>
                    <StatusBar barStyle="dark-content" hidden={true} />
                    
                    <NavigationContainer>
                        <SafeAreaView style={{ flex: 1 }}>
                            <RootNavigator />
                        </SafeAreaView>
                    </NavigationContainer>
                </>
            </StyleProvider>
        </StoreProvider>
    );
};

export default App;