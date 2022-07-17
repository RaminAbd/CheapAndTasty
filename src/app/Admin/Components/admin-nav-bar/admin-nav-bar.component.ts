import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

  constructor(private authService: AuthService, private router :Router) { }

  ngOnInit(): void {
  }
  Logout(){
    this.authService.SignOut();
    this.router.navigate(['/login'])
  }
}
