import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../models/user-model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail implements OnInit{
  
  userToDisplay: User | null = null;
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {   
        this.userService.getOneUser(id).subscribe({
        next: (user) => {
            this.userToDisplay = user;
            this.isLoading = false;
            this.cdr.detectChanges();
            console.log(user);
      },
      error: (err) => {
        console.error('Error loading user:', err);
        this.isLoading = false;
      }
    });
    }
  }

  deleteUser(id: string | undefined): void {
    if(!id) return;
    if (this.confirmDialogService.confirmDelete()) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          alert('User successfully deleted');
          this.router.navigate(['/view-all-users']);
        }
      })
    }
  }
}
