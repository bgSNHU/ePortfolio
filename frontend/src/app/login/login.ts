import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SessionService } from '../services/session.service';
import { User } from '../models/user-model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  usersDropdown: User[] = [];
  selectedUserId: string = '';

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
      this.userService.getAllUsers().subscribe({
        next: (users) => {
          this.usersDropdown = users;
          this.cdr.detectChanges();
        }
      })
  }

  onLogin() {
    const user = this.usersDropdown.find(u => u._id === this.selectedUserId);
    if (user) {
      this.sessionService.setUser(user);
      this.router.navigate(['/']);
    }
  }
}
