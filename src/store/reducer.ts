import {combineReducers} from 'redux';
import {
  Action,
  ActionType,
  TodosState,
  FetchStatus,
  FetchTodosSuccessAction,
  ChangeTodoAction,
  DeleteTodoAction,
} from './types';

const DEFAULT_STATE: TodosState = {
  todos: {},
  requestStatus: FetchStatus.IDLE,
};

const todosReducer = (state = DEFAULT_STATE, action: Action): TodosState => {
  switch (action.type) {
    case ActionType.FetchTodosRequest:
      return {
        ...state,
        requestStatus: FetchStatus.PENDING,
      };
    case ActionType.FetchTodosFailure:
      return {
        ...state,
        requestStatus: FetchStatus.FAILURE,
      };
    case ActionType.FetchTodosSuccess:
      return {
        ...state,
        todos: (action as FetchTodosSuccessAction).todos,
        requestStatus: FetchStatus.SUCCESS,
      };
    case ActionType.ChangeTodo: {
      const typedAction = action as ChangeTodoAction;
      return {
        ...state,
        todos: {
          ...state.todos,
          [typedAction.todo.id]: typedAction.todo,
        },
      };
    }
    case ActionType.DeleteTodo: {
      const typedAction = action as DeleteTodoAction;
      const newTodos = {...state.todos};
      delete newTodos[typedAction.id];
      return {
        ...state,
        todos: newTodos,
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  todos: todosReducer,
});
