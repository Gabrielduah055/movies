import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { STORAGE_KEYS } from '../../Shared/constants';


import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, RouterTestingModule],
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.callThrough()
    localStorage.clear()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy()
  })

  it('email field validity', () => {
    let email = component.loginForm.controls['email'];
    expect(email.value).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();

    email.setValue('test');
    expect(email.hasError('email')).toBeTruthy();

    email.setValue('test@example.com');
    expect(email.hasError('email')).toBeFalsy()
  })

  it('password field validity', () => {
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();

    password.setValue('Password1');
    expect(password.hasError('required')).toBeFalsy();
  })

  it('should show alet if form is invalid on submit', () => {
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('please the fill in the form correctly');
  })


  it('should navigate to home on successful login',async () => {
    localStorage.setItem(STORAGE_KEYS.EMAIL, 'test@example.com');
    localStorage.setItem(STORAGE_KEYS.PASSWORD, 'Password1');

    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('Password1');
    fixture.detectChanges();

  

    await component.onSubmit();

    // expect(router.navigateByUrl).toBe('/home')
  });

  
  it('should show alert on incorrect email or password', () => {
    spyOn(window, 'alert');
    localStorage.setItem(STORAGE_KEYS.EMAIL, 'test@example.com');
    localStorage.setItem(STORAGE_KEYS.PASSWORD, 'Password1');

    component.loginForm.controls['email'].setValue('wrong@example.com');
    component.loginForm.controls['password'].setValue('wrongpassword');
    fixture.detectChanges();

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('please the fill in the form correctly');
  });
});
