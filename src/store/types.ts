import {TodoItem} from '../screens/TodoList/TodoList.types';

export interface TodosState {
  todos: TodosMap;
  requestStatus: FetchStatus;
}

export interface AppState {
  todos: TodosState;
}

export enum ActionType {
  SetTodos = 'SetTodos',
  FetchTodosRequest = 'FetchTodosRequest',
  FetchTodosSuccess = 'FetchTodosSuccess',
  FetchTodosFailure = 'FetchTodosFailure',
  ChangeTodo = 'ChangeTodo',
}

export type TodosMap = {
  [id: string]: TodoItem;
};

export interface ActionBase {
  type: ActionType;
}

export enum FetchStatus {
  IDLE,
  PENDING,
  SUCCESS,
  FAILURE,
}

export type FetchTodosRequestAction = ActionBase;

export interface FetchTodosSuccessAction extends ActionBase {
  todos: {[key: string]: TodoItem};
}

export type FetchTodosFailureAction = ActionBase;

export interface ChangeTodoAction extends ActionBase {
  todo: TodoItem;
}

export type Action =
  | FetchTodosRequestAction
  | FetchTodosFailureAction
  | FetchTodosRequestAction
  | ChangeTodoAction;
