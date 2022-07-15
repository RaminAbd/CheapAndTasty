import { Injectable, Injector } from '@angular/core';
import {throwError as observableThrowError, Observable, catchError} from 'rxjs';

import { Router } from '@angular/router';
import { SignInRequest } from '../Models/SignInRequest';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../Services/Auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private authService: AuthService,private router:Router) {}
  SignInRequest:SignInRequest = new SignInRequest()
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if(errorResponse.status===401 && errorResponse.statusText==='Unauthorized'){
          localStorage.setItem('token',"");
          var userName = localStorage.getItem('userName') as string;
          var password = localStorage.getItem('password') as string;
          this.SignInRequest.userName = userName;
          this.SignInRequest.password = password;
          this.authService.SignIn(this.SignInRequest).subscribe(data=>{ })
        }

        return observableThrowError(errorResponse);
      })

    );
  }
}
