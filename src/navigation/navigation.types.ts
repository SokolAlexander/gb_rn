import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  TodoList: undefined;
  TodoDetails: {
    todoId: string;
  };
  ImageFull: {
    todoId: string;
    assetUri: string;
  };
};

type ScreenNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export type NavigationProps<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};
