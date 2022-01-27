import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import {TodoList} from './src/screens/TodoList/TodoList';
import {store} from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar />
        <TodoList />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
