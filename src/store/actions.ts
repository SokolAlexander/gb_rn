import {ThunkAction} from 'redux-thunk';
import {config} from '../config';
import {TodoItem} from '../screens/TodoList/TodoList.types';
import {
  ActionType,
  ChangeTodoAction,
  DeleteTodoAction,
  FetchTodosFailureAction,
  FetchTodosSuccessAction,
  TodosMap,
  TodosState,
} from './types';

export const fetchTodosSuccess = (
  todos: TodosMap,
): FetchTodosSuccessAction => ({
  type: ActionType.FetchTodosSuccess,
  todos,
});

export const fetchTodosFailure = () => ({
  type: ActionType.FetchTodosFailure,
});
export const fetchTodosRequest = () => ({
  type: ActionType.FetchTodosRequest,
});

export const fetchTodos =
  (): ThunkAction<
    void,
    TodosState,
    undefined,
    FetchTodosSuccessAction | FetchTodosFailureAction
  > =>
  async dispatch => {
    dispatch(fetchTodosRequest());
    try {
      const response = await fetch(config.todosUrl);
      const result: TodoItem[] = await response.json();

      const todos = result.reduce<TodosMap>((acc, todo) => {
        acc[todo.id] = todo;
        return acc;
      }, {});

      dispatch(fetchTodosSuccess(todos));
    } catch (e) {
      // show error - home work
    }
  };

export const changeTodo = (todo: TodoItem): ChangeTodoAction => ({
  type: ActionType.ChangeTodo,
  todo,
});

export const deleteTodo = (id: string): DeleteTodoAction => ({
  type: ActionType.DeleteTodo,
  id,
});
