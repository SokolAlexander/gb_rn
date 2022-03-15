import {TodoItem} from '../../screens/TodoList/TodoList.types';

export type TodoElementProps = {
  todo: TodoItem;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onPress: (id: string) => void;
};
