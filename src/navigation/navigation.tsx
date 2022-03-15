import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {TodoList} from '../screens/TodoList/TodoList';
import {RootStackParamList} from './navigation.types';
import {TodoDetails} from '../screens/TodoDetails/TodoDetails';
import {BackButton} from '../components/BackButton/BackButton';
import {ImageFull} from '../screens/ImageFull/ImageFull';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <RootStack.Navigator initialRouteName="TodoList">
    <RootStack.Screen name="TodoList" component={TodoList} />
    <RootStack.Screen
      options={{
        title: 'Details',
        headerTintColor: 'darkgrey',
        headerTitleStyle: {
          fontSize: 20,
        },
        headerTitleAlign: 'center',
        headerLeft: ({onPress}) => <BackButton onPress={onPress} />,
      }}
      name="TodoDetails"
      component={TodoDetails}
    />
    <RootStack.Screen
      options={{
        title: 'Details',
        headerTintColor: 'darkgrey',
        headerTitleStyle: {
          fontSize: 20,
        },
        headerTitleAlign: 'center',
        headerLeft: ({onPress}) => <BackButton onPress={onPress} />,
      }}
      name="ImageFull"
      component={ImageFull}
    />
  </RootStack.Navigator>
);
