import {AppState} from './types';

export const selectTodos = (state: AppState) => state.todos.todos;
