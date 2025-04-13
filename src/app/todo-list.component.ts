import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TodoActions from './store/todo.actions';
import * as TodoSelectors from './store/todo.selectors';
import { Observable } from 'rxjs/internal/Observable';
import { Todo } from './store/todo.model';


@Component({
  selector: 'app-todo-list',
  template: `
    <div *ngIf="loading$ | async">Loading...</div>
    <div *ngIf="error$ | async as error">Error: {{ error }}</div>
    <ul>
      <li *ngFor="let todo of todos$ | async">
        {{ todo.title }}
        <input
          type="checkbox"
          [checked]="todo.completed"
          (change)="toggleTodo(todo.id)"
        >
      </li>
    </ul>
  `
})
export class TodoListComponent implements OnInit {
  //todos$ = this.store.select(TodoSelectors.selectAllTodos);
  //loading$ = this.store.select(TodoSelectors.selectLoading);
  //error$ = this.store.select(TodoSelectors.selectError);
  todos$!: Observable<Todo[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    // Set observables after store is initialized
    this.todos$ = this.store.select(TodoSelectors.selectAllTodos);
    this.loading$ = this.store.select(TodoSelectors.selectLoading);
    this.error$ = this.store.select(TodoSelectors.selectError);
    this.store.dispatch(TodoActions.loadTodos());
  }

  toggleTodo(id: number) {
    // Implement toggle action
  }
}