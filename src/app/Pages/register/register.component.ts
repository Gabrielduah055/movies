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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, PasswordComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit{
  fb = inject(FormBuilder);
  register = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
  });

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    console.log(this.register.getRawValue());
  }

  get emailRequired() {
    return (
      this.register.get('email')?.touched &&
      this.register.get('email')?.hasError('required')
    );
  }


}
