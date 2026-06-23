import { User } from '../../models/user-model';
import { UserService } from '../../services/user.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-edit-user',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})
export class EditUser implements OnInit {

  editUserForm: FormGroup = new FormGroup({});
  userToDisplay: User | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private formBuilder: FormBuilder,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');

      this.editUserForm = this.formBuilder.group({
        userName: ['', Validators.required],
        userFirstName: ['', Validators.required],
        userLastName: ['', Validators.required],
        userEmail: ['', Validators.required],
        userRole: ['', Validators.required]
      })

      if (id) {
        this.userService.getOneUser(id).subscribe({
          next: (user) => {
            this.userToDisplay = user;

            this.editUserForm.patchValue({
              userName: user.userName,
              userFirstName: user.userFirstName,
              userLastName: user.userLastName,
              userEmail: user.userEmail,
              userRole: user.userRole
            })
          }
        });
      }
  }

  onSubmit() {
    if (this.editUserForm.valid && this.userToDisplay !== null) {
      this.userService.updateUser(this.userToDisplay._id, this.editUserForm.value).subscribe({
        next: () => {
          alert('User updated sucessfully');
          this.router.navigate(['/view-all-users']);
        }, error: (err) => {
          console.error('Error updating user', err);
        }
      });
    }
  }

  deleteUser(id: string): void {
    if(!id) return;
    if (this.confirmDialogService.confirmDelete()) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          alert('User deleted');
          this.router.navigate(['/view-all-users']);
        }
      })
    }
  }
}
