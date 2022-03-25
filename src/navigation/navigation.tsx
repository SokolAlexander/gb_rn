import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import {TodoList} from '../screens/TodoList/TodoList';
import {BottomTabsParamList, MainStackParamList} from './navigation.types';
import {TodoDetails} from '../screens/TodoDetails/TodoDetails';
import {BackButton} from '../components/BackButton/BackButton';
import {ImageFull} from '../screens/ImageFull/ImageFull';
import {Settings} from '../screens/Settings/Settings';

const MainStack = createStackNavigator<MainStackParamList>();
const RootTabs = createBottomTabNavigator<BottomTabsParamList>();

export const StackNavigator = () => (
  <MainStack.Navigator initialRouteName="TodoList">
    <MainStack.Screen name="TodoList" component={TodoList} />
    <MainStack.Screen
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
    <MainStack.Screen
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
  </MainStack.Navigator>
);

export const TabNav = () => (
  <RootTabs.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel: false,
    }}>
    <RootTabs.Screen
      name="Main"
      component={StackNavigator}
      options={{tabBarIcon: props => <Icon name="list" {...props} />}}
    />
    <RootTabs.Screen
      name="Settings"
      component={Settings}
      options={{tabBarIcon: props => <Icon name="gear" {...props} />}}
    />
  </RootTabs.Navigator>
);
