import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState, todoAdapter } from './todo.reducer';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const {
  selectAll: selectAllTodos,
  selectEntities: selectTodoEntities,
  selectIds: selectTodoIds,
} = todoAdapter.getSelectors(selectTodoState);

export const selectLoading = createSelector(
  selectTodoState,
  state => state.loading
);

export const selectError = createSelector(
  selectTodoState,
  state => state.error
);