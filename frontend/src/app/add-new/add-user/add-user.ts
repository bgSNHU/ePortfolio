import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser implements OnInit {
  addUserForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ){}

  ngOnInit(): void {
      this.addUserForm = this.formBuilder.group({
        userName: ['', Validators.required],
        userFirstName: ['', Validators.required],
        userLastName: ['', Validators.required],
        userEmail: ['', Validators.required, Validators.email],
        
      })
  }
}
