import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpRequest } from '../../Models/SignUpRequest';
import { AuthService } from '../../Services/Auth.service';
import { SignInRequest } from '../../Models/SignInRequest';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  signUpRequest: SignUpRequest = new SignUpRequest();
  showErrorMessage = false;
  errorMessage: string | null = null;
  mismatchPasswordError: string | null = null;
  registrationForm: FormGroup;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern('^(\\+995-?)?[0-9]{9}$'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('(?=.*[A-Z])(?=.*[0-9]).{6,11}$'),
      ]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
    });
    this.registrationForm.controls['password'].errors;
  }

  validateMin(value: string) {
    return (
      this.registrationForm.controls[value].valid ||
      this.registrationForm.controls[value].untouched ||
      !this.registrationForm.controls[value].errors?.['minLength']
    );
  }

  validatePattern(value: string) {
    return (
      this.registrationForm.controls[value].valid ||
      this.registrationForm.controls[value].untouched ||
      !this.registrationForm.controls[value].errors?.['pattern']
    );
  }

  validateRequired(value: string) {
    return (
      (this.registrationForm.controls[value].valid ||
        this.registrationForm.controls[value].untouched ||
        !this.registrationForm.controls[value].errors?.['required']) &&
      (!this.showErrorMessage ||
        !this.registrationForm.controls[value].errors?.['required'])
    );
  }
  signUp() {
    this.signUpRequest = this.registrationForm.value;
    console.log(JSON.stringify(this.signUpRequest));

    if (this.registrationForm.valid) {
      this.mismatchPasswordError = null;
      this.authService.SignUp(this.signUpRequest).subscribe(
        (data) => {
          console.log(data);
          var signInRequest: SignInRequest = {
            userName: this.signUpRequest.userName,
            password: this.signUpRequest.password,
          };
          this.authService.SignIn(signInRequest).subscribe((data) => {
            console.log(data);
            this.router.navigate(['']);
          });
        },
        (error) => {
          console.log(error);
          error.error.forEach((e: any) => {
            if (e.code === 'DuplicateUserName') {
              this.errorMessage = 'This account is now available!';
            }
          });
        }
      );
    } else {
      console.log('not valid');
      this.showErrorMessage = true;
      this.mismatchPasswordError = 'Passwords do not match!';
    }
  }
}
