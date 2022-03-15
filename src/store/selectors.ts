import {AppState} from './types';

export const selectTodos = (state: AppState) => state.todos.todos;
export const selectTodoById = (todoId: string) => (state: AppState) =>
  state.todos.todos[todoId];
