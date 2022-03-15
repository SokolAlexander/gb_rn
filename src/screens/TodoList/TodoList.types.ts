import {Asset} from 'react-native-image-picker';

import {NavigationProps} from '../../navigation/navigation.types';

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  readonly assets: Asset[];
}

export type ListSection = {
  data: TodoItem[];
  title: string;
};

export type TodoListProps = NavigationProps<'TodoList'>;
