import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Emitters } from '../Emitters/emitters';
import { SignUpRequest } from '../Models/SignUpRequest';
import { SignInRequest } from '../Models/SignInRequest';
import { tap } from "rxjs";
import { SignInResponse } from '../Models/SignInResponse';
import { SignUpResponse } from '../Models/SignUpResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BaseUrl = "http://cheapandtasty-001-site1.ctempurl.com/api/";
  constructor(private http: HttpClient) { }
  authenticated: boolean = false;
  get isLoggedIn(): boolean {
    var token = localStorage.getItem("token");
    if(token!==null && token!=="" && token !== undefined){
      this.authenticated = true;
    }
    else{
      this.authenticated = false;
    }
    return this.authenticated;
  }
  SignUp(requestObject:SignUpRequest){
    return this.http.post<SignUpResponse>(this.BaseUrl+"Accounts/SignUp", requestObject);
  }
  SignIn(requestObject:SignInRequest){
    return this.http.post<SignInResponse>(this.BaseUrl + "Accounts/SignIn", requestObject).pipe(
      tap(data=>{
        if(data.token!=="" || data.token!==null){
          localStorage.setItem("userId", data.id)
          localStorage.setItem("token", data.token);
          localStorage.setItem("userName", requestObject.userName);
          localStorage.setItem("password", requestObject.password);
          localStorage.setItem("isAdmin", String(data.isAdmin));
          console.log(localStorage.getItem('isAdmin'));
        }
      })
    )
  }
  SignOut(){
    console.log("out");

    localStorage.setItem("token", "");
  }
}
