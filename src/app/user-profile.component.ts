import { Component, OnInit } from '@angular/core';
import { UserStateService } from './user-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  template: `
    <div *ngIf="user$ | async as user">
      <h2>Welcome, {{ user.name }}!</h2>
      <p>Email: {{ user.email }}</p>
    </div>
  `
})
export class UserProfileComponent implements OnInit {
    // user$ = this.userState.user$; --> caused error: Property 'userState' is used before its initialization.ts(2729)
    // user-profile.component.ts(16, 15): 'userState' is declared here.
    user$!: Observable<{ id: number; name: string; email: string } | null>;

    constructor(private userState: UserStateService) {}

    ngOnInit() {
        // ERROR FIX: Initialize the observable AFTER userState is available
        this.user$ = this.userState.user$;

        // Simulating user login
        this.userState.setUser({
            id: 1,
            name: 'John Doe',
            email: 'john@example.com'
        });
    }
}