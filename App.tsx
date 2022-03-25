import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import {TabNav} from './src/navigation/navigation';
import {store} from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar />
      <NavigationContainer>
        <TabNav />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
