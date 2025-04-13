import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = signal<Todo[]>([]);
  private loading = signal(false);

  // Computed signals
  completedTodos = computed(() => 
    this.todos().filter(todo => todo.completed)
  );

  pendingTodos = computed(() => 
    this.todos().filter(todo => !todo.completed)
  );

  constructor(private http: HttpClient) {}

  async fetchTodos() {
    this.loading.set(true);
    try {
      const response = await fetch('https://api.example.com/todos');
      const data = await response.json();
      this.todos.set(data);
    } finally {
      this.loading.set(false);
    }
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://api.example.com/todos');
  }
  

  addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    };
    this.todos.update(current => [...current, newTodo]);
  }

  toggleTodo(id: number) {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
}