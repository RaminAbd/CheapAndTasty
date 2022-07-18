import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  showLogin:boolean = false
  haveOrders:boolean = false
  constructor( private authService:AuthService,) { }

  ngOnInit(): void {
    this.showLogin = this.authService.isLoggedIn ? false : true;


  }

}
