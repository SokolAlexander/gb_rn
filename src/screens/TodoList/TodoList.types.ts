import {NavigationProps} from '../../navigation/navigation.types';

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export type ListSection = {
  data: TodoItem[];
  title: string;
};

export type TodoListProps = NavigationProps<'TodoList'>;
