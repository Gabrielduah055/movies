import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator } from '../../Shared/Validators/email.validator';
import { password } from '../../Shared/Validators/password.validator';
import { STORAGE_KEYS } from '../../Shared/constants';
import { NgIf, CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required, password]],
  });

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.loginForm.valid) {
      alert('please the fill in the form correctly');
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    const storedEmail = localStorage.getItem(STORAGE_KEYS.EMAIL);
    const storedPassword = localStorage.getItem(STORAGE_KEYS.PASSWORD);

    if (
      storedEmail &&
      storedPassword &&
      email == storedEmail &&
      password == storedPassword
    ) {
      //if the credential matches, navigate to the home page
      this.router.navigateByUrl('/home');
    } else {
      alert('Incorrect email or password');
    }
  }

  get emailRequired() {
    return (
      this.loginForm.get('email')?.touched &&
      this.loginForm.get('email')?.hasError('required')
    );
  }

  get email() {
    return this.loginForm.get('email');
  }

  get emailValid() {
    return (
      this.loginForm.get('email')?.touched &&
      this.loginForm.get('email')?.hasError('email')
    );
  }

  get password() {
    return this.loginForm.get('password');
  }

  get passwordRequired() {
    return (
      this.loginForm.get('password')?.touched &&
      this.loginForm.get('password')?.hasError('required')
    );
  }
}
