import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import {RootNavigator} from './src/navigation/navigation';
import {store} from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      {/* <SafeAreaView> */}
      <StatusBar />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      {/* </SafeAreaView> */}
    </Provider>
  );
};

export default App;
