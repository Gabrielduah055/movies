import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
  NonNullableFormBuilder,
} from '@angular/forms';
import { PasswordComponent } from '../../Components/password/password.component';
import { emailValidator } from '../../Shared/Validators/email.validator';
import { password } from '../../Shared/Validators/password.validator';
import { passwordRepeat } from '../../Shared/Validators/password-repeat.validator copy';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, PasswordComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  register = this.fb.group({
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required, password]],
    repeatPassword: ['', [Validators.required]],
  });
  isFormValid = false;

  ngOnInit(): void {
    this.register.addValidators(passwordRepeat);
    this.register.valueChanges.subscribe(
      () => (this.isFormValid = this.register.valid)
    );
  }

  onSubmit(): void {
    // console.log(this.register.getRawValue());
    if (this.isFormValid) {
      const email = this.register.get('email')?.value ?? '';
      const password = this.register.get('password')?.value ?? '';

      //storing the email and the password in localstorage
      localStorage.setItem('email', email);
      localStorage.setItem('password', password)


      this.router.navigateByUrl('/');
    }
  }

  get emailRequired() {
    return (
      this.register.get('email')?.touched &&
      this.register.get('email')?.hasError('required')
    );
  }

  get emailValid() {
    return (
      this.register.get('email')?.touched &&
      this.register.get('email')?.hasError('email')
    );
  }

  get passwordRequired() {
    return (
      this.register.get('password')?.touched &&
      this.register.get('password')?.hasError('required')
    );
  }

  get passwordRepeat() {
    return (
      this.register.get('repeatPassword')?.touched &&
      this.register.hasError('passwordMismatch')
    );
  }
}
