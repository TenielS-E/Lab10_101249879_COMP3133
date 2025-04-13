import { Component } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <h2>Counter: {{ counterService.getCount()() }}</h2>
      <h3>Double Count: {{ counterService.doubleCount() }}</h3>
      <button (click)="counterService.increment()">Increment</button>
      <button (click)="counterService.decrement()">Decrement</button>
    </div>
  `
})
export class CounterComponent {
  constructor(public counterService: CounterService) {}
}