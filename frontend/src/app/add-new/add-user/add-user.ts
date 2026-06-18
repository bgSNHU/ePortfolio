import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-add-user',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser implements OnInit {
  addUserForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    public notificationService: NotificationService
  ){}

  ngOnInit(): void {
      this.addUserForm = this.formBuilder.group({
        userName: ['', Validators.required],
        userFirstName: ['', Validators.required],
        userLastName: ['', Validators.required],
        userEmail: ['', [Validators.required, Validators.email]],
        userRole: ['', Validators.required],
        userPassword: ['', Validators.required]
      })
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      this.userService.addNewUser(this.addUserForm.value).subscribe({
        next: () => {
          this.notificationService.showSuccess('User added successfully!');
          setTimeout(() => this.router.navigate(['/view-all-users']), 3000);
        }, error: (err) => {
          this.notificationService.showError('Error adding user');
          console.error('Error adding user: ', err);
        }
      });
    }
  }
}
