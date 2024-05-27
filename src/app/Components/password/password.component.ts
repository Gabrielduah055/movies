import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {

  passwordForm:FormGroup = this.fb.group({
    password:['', {validators:[Validators.required]}],
    repeatPassword:['', {validators:[Validators.required]}]
    
  }, {validators:this.passwordMatchValidator});


  constructor(private fb:FormBuilder){}

  private passwordMatchValidator(g:FormGroup){
    
  }
}
