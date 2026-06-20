import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { DatePipe, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../models/user-model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-all-users',
  imports: [RouterLink, DatePipe, AsyncPipe],
  templateUrl: './view-all-users.html',
  styleUrl: './view-all-users.css',
})
export class ViewAllUsers implements OnInit {

  allUsers$: Observable<User[]> | null = null;
  allUsers: User[] = [];

  constructor(
    private userService: UserService,
    private confirmDialogService: ConfirmDialogService,
  ) {}

  ngOnInit(): void {
      this.allUsers$ = this.userService.getAllUsers().pipe(
        tap(users => this.allUsers = users)
      );
  }

  deleteUser(id: string): void {
    if (!id) return;
    if (this.confirmDialogService.confirmDelete()) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.allUsers = this.allUsers.filter(user => user._id !== id);
          this.allUsers$ = new Observable(observer => observer.next(this.allUsers));
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        }
      });
    }
  }
}
