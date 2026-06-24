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
  
  // Create & initialize class variables
  userToDisplay: User | null = null;
  isLoading: boolean = true;

  // Instantiate services & imports
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');  // Gets ObjectId from URL
    if (id) {                                           // Checks if ObjectId is present
        this.userService.getOneUser(id).subscribe({     // Calls user service to get a single User
        next: (user) => {
            this.userToDisplay = user;
            this.isLoading = false;                     // Used to display loading screen in HTML file
            this.cdr.detectChanges();                   // Triggers page refresh
      },
      error: (err) => {
        console.error('Error loading user:', err);
        this.isLoading = false;
      }
    });
    }
  }

  // Calls delete confirmation service then passes user info to backend controller to delete user
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
