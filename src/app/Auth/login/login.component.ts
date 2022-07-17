import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignInResponse } from '../../Models/SignInResponse';
import { SignInRequest } from '../../Models/SignInRequest';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showErrorMessage = false;
  errorMessage: string | null = null;

  loginForm!: FormGroup;
  SignInRequest:SignInRequest = new SignInRequest();
  SignInResponse:SignInResponse = new SignInResponse();
  constructor(private router:Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  submitHandler(loginForm: any):void {
    if(this.loginForm.valid){
      console.log(loginForm, this.showErrorMessage);
    } else {
      console.log("not valid");
      this.showErrorMessage = true;
    }
  }

  validatePattern(value: string) {
    return (
      ((this.loginForm.controls[value].valid || this.loginForm.controls[value].untouched) ||
      !(this.loginForm.controls[value].errors?.['pattern']))
    )
  }


  validateRequired(value: string) {
    return (
      ((this.loginForm.controls[value].valid || this.loginForm.controls[value].untouched) ||
      !(this.loginForm.controls[value].errors?.['required'])) &&
      (!this.showErrorMessage || !(this.loginForm.controls[value].errors?.['required']))
    )
  }
  SignIn(){
    this.SignInRequest = this.loginForm.value;
    if(this.loginForm.valid){
      this.authService.SignIn(this.SignInRequest).subscribe(data=>{

        this.SignInResponse = data;
        console.log(this.SignInResponse);
        if(this.SignInResponse.token!=="" || this.SignInResponse.token!==null){
          console.log("girdi");
          this.router.navigate(['admin'])
        }
      },
      error => {
        // error.error.forEach((e:any) => {
        //   if(e.title === "DuplicateUserName"){
        //     this.errorMessage = "Bu seriyalı hesab artıq mövcuddur!"
        //   }
        // });
        console.log("error",error);
        this.errorMessage = "login və ya şifrə yanlışdır!"

      })
    } else {
      this.showErrorMessage = true;
    }
  }
}
