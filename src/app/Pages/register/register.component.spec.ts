import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing'
import { PasswordComponent } from '../../Components/password/password.component';
import { emailValidator } from '../../Shared/Validators/email.validator';
import { password } from '../../Shared/Validators/password.validator';
import { passwordRepeat } from '../../Shared/Validators/password-repeat.validator copy';
import { STORAGE_KEYS } from '../../Shared/constants';
import { User } from '../../Interface/auth';

import { RegisterComponent } from './register.component';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, RouterTestingModule, PasswordComponent],
      providers:[]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router)
    spyOn(router, 'navigateByUrl').and.stub();
    localStorage.clear();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.register.valid).toBeFalsy()
  })

  it('email field validity', () => {
    let email = component.register.controls['email'];
    expect(email.valid).toBeFalsy();
  })

  it('password field validity', () => {
    let password = component.register.controls['password'];
    expect(password.valid).toBeFalsy()
  })

  it('should set isFormValid to true when form is valid', () => {
    component.register.controls['email'].setValue('test@example.com')
    component.register.controls['password'].setValue('Password1');
    component.register.controls['repeatPassword'].setValue('Password1')
    fixture.detectChanges();
    expect(component.isFormValid).toBeFalsy();
  })

  it('should save user to the localStorage and navigate to home on valid form submit', () => {
    component.register.controls['email'].setValue('test@example.com');
    component.register.controls['password'].setValue('Password1')
    component.register.controls['repeatPassword'].setValue('Password1');
    component.isFormValid = true;
    fixture.detectChanges()

    component.onSubmit()

    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
    const users:User[] = usersJson ? JSON.parse(usersJson):[];
    expect(users.length).toBe(1);
    expect(users[0].email).toBe('test@example.com');

    expect(localStorage.getItem(STORAGE_KEYS.EMAIL)).toBe('test@example.com');
    expect(localStorage.getItem(STORAGE_KEYS.PASSWORD)).toBe('Password1')

    expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/')
  })

  it('should alert if email is already registerd', () => {
    spyOn(window, 'alert');
    const existingUser:User = {email: 'test@example.com', password:'Password1'};
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([existingUser]))


    component.register.controls['email'].setValue('test@example.com')
    component.register.controls['password'].setValue('Password1');
    component.register.controls['repeatPassword'].setValue('Password1')
    component.isFormValid = true;
    fixture.detectChanges()

    component.onSubmit()

    expect(window.alert).toHaveBeenCalledWith('This emial is already registered');
  })
});
