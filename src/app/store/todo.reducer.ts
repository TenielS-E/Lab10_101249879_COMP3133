import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Todo } from './todo.model';


export interface TodoState extends EntityState<Todo> {
  loading: boolean;
  error: any;
}

export const todoAdapter = createEntityAdapter<Todo>();

export const initialState: TodoState = todoAdapter.getInitialState({
  loading: false,
  error: null
});

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, state => ({
    ...state,
    loading: true
  })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) =>
    todoAdapter.setAll(todos, { ...state, loading: false })
  ),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);