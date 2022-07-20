import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../Admin/Services/Cart.service';
import { CartResponseItemDTO } from '../../Models/CartResponseItemDTO';
import { AuthService } from '../../Services/Auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../../Admin/Services/Orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userId:string;
  cartResponse:CartResponseItemDTO = new CartResponseItemDTO();
  totalPrice:number = 0;
  address: string;
  isLoggedIn = false;
  showAddressInput:boolean = false;
  constructor(private cartService:CartService, private authService: AuthService, private router:Router, private ordersService:OrderService) { }

  ngOnInit(): void {

    this.userId = localStorage.getItem('userId') as string;
    this.address = localStorage.getItem('address') as string;
    this.GetCartByUserId(this.userId);

    // this.GetCartByUserId(this.userId);
  }
  GetCartByUserId(id:string){
    this.cartService.GetCartByUserId(id).subscribe(resp=>{
      this.cartResponse = resp.data
      this.totalPrice = this.cartResponse.totalPrice + 2;
      console.log(this.cartResponse);
      if(this.cartResponse.cartItems.length ===0){
        this.router.navigate(['/products']).then(() => {
          window.location.reload();
        });
      }
    })
  }
  removeCartItem(item:any){
    var obj={
      'cartId':item.cartId,
      'itemId':item.id
    }
    this.cartService.RemoveItem(obj).subscribe(resp=>{
      this.GetCartByUserId(this.userId);
    })
  }

  CreateOrder(){
    var obj={
      'userId':localStorage.getItem('userId') as string,
      'address':localStorage.getItem('address') as string
    }
    this.ordersService.CreateOrder(obj).subscribe(resp=>{
      console.log(resp);
      if(resp.isSuccess){
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      }

    })
  }

  editAddress(){
    this.showAddressInput = true;
    localStorage.setItem('address',this.address)
  }
  applyAddress(){
    this.showAddressInput = false
  }
}
