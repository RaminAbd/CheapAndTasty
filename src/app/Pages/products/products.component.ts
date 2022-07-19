import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../Admin/Services/Cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  showLogin:boolean = false
  haveOrders:boolean = false
  userId:string;
  showCart:boolean = false
  isLoggedIn = false;
  constructor( private authService:AuthService,private router:Router, private cartService:CartService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;

    this.showLogin = this.authService.isLoggedIn ? false : true;
    this.userId = localStorage.getItem('userId') as string;
    this.showCart = true;
    this.cartService.GetCartByUserId(this.userId).subscribe(resp=>{
      console.log(resp);

      if(resp.data.cartItems.length === 0){
        this.showCart = false;
        this.haveOrders = true;
      }
    })
  }
  Logout(){
    this.authService.SignOut();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
