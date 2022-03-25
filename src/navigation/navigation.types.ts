import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

export type MainStackParamList = {
  TodoList: undefined;
  TodoDetails: {
    todoId: string;
  };
  ImageFull: {
    todoId: string;
    assetUri: string;
  };
};

type ScreenNavigationProp<T extends keyof MainStackParamList> =
  StackNavigationProp<MainStackParamList, T>;

type ScreenRouteProp<T extends keyof MainStackParamList> = RouteProp<
  MainStackParamList,
  T
>;

export type NavigationProps<T extends keyof MainStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

export type BottomTabsParamList = {
  Main: undefined;
  Settings: undefined;
};
