import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Admin/Services/Cart.service';
import { CartResponseItemDTO } from '../../Models/CartResponseItemDTO';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userId:string;
  cartResponse:CartResponseItemDTO = new CartResponseItemDTO();
  totalPrice:number = 0;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') as string;

    this.GetCartByUserId(this.userId);
  }
  GetCartByUserId(id:string){
    this.cartService.GetCartByUserId(id).subscribe(resp=>{
      this.cartResponse = resp.data
      this.totalPrice = this.cartResponse.totalPrice + 2;
      console.log(this.cartResponse);

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
}
