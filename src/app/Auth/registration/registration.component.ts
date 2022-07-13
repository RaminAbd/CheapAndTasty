import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpRequest } from '../../Models/SignUpRequest';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  signUpRequest:SignUpRequest = new SignUpRequest();
  showErrorMessage = false;
  errorMessage: string | null = null;
  mismatchPasswordError: string | null = null;
  registrationForm: FormGroup
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      personalID: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{11}')]),
      phoneNumber: new FormControl(null, [Validators.required,Validators.pattern("^(\\+995-?)?[0-9]{9}$")]),
      password: new FormControl(null, [Validators.required, Validators.pattern("(?=.*[A-Z])(?=.*[0-9]).{6,11}$")]),
      repeatedPassword: new FormControl(null, [Validators.required])
    })
    this.registrationForm.controls['password'].errors
  }

  validateMin(value: string) {
    return (
      ((this.registrationForm.controls[value].valid || this.registrationForm.controls[value].untouched) ||
      !(this.registrationForm.controls[value].errors?.['minLength']))
    )
  }

  validatePattern(value: string) {
    return (
      ((this.registrationForm.controls[value].valid || this.registrationForm.controls[value].untouched) ||
      !(this.registrationForm.controls[value].errors?.['pattern']))
    )
  }


  validateRequired(value: string) {
    return (
      ((this.registrationForm.controls[value].valid || this.registrationForm.controls[value].untouched) ||
      !(this.registrationForm.controls[value].errors?.['required'])) &&
      (!this.showErrorMessage || !(this.registrationForm.controls[value].errors?.['required']))
    )
  }
  signUp(){
    this.signUpRequest = this.registrationForm.value;
    if(this.signUpRequest.password === this.signUpRequest.repeatedPassword && this.registrationForm.valid){
      this.mismatchPasswordError = null;
      // this.authService.SignUp(this.signUpRequest).subscribe(data => {
      //   console.log(data);
      //   this.SignUpResponse = data;
      //   if(data.userId !== null && data.userId !== ""){

      //     var signInRequest:SignInRequest ={
      //       personalID:this.signUpRequest.personalID,
      //       password:this.signUpRequest.password
      //     }
      //     this.authService.SignIn(signInRequest).subscribe(data=>{
      //
      //
      //     })
      //   }
      //   // this.router.navigate(['./login'])
      //   // localStorage.setItem("userId", data.userId);
      // },
      // (error)=>{
      //   console.log(error);
      //   error.error.forEach((e:any) => {
      //     if(e.code === "DuplicateUserName"){
      //       this.errorMessage = "Bu seriyalı hesab artıq mövcuddur!"
      //     }
      //   });

      // })
    }
    else{
      console.log("not valid");
      this.showErrorMessage = true;
      this.mismatchPasswordError = "Şifrələr uyğun gəlmir!";
    }
  }

}
