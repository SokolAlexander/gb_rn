import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {TodoList} from '../screens/TodoList/TodoList';
import {IStackNavigation} from './navigation.types';

const RootStack = createStackNavigator<IStackNavigation>();

export const RootNavigator = () => (
  <RootStack.Navigator initialRouteName="TodoList">
    <RootStack.Screen name="TodoList" component={TodoList} />
  </RootStack.Navigator>
);
