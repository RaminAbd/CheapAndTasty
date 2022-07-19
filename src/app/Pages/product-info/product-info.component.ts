import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DishService } from '../../Admin/Services/Dishes.service';
import { Dish } from '../../Models/Dish';
import { CartRequestDTO } from '../../Models/CartRequestDTO';
import { CartRequestItem } from '../../Models/CartRequestItem';
import { CartService } from '../../Admin/Services/Cart.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  productId:any;
  Dishes:Dish[] = []
  Dish:Dish = new Dish()
  ingredientsPrice:number=0;
  dishPrice:number=0;
  userId:string;
  constructor( private router:Router, private route:ActivatedRoute,private dishService:DishService, private cartService:CartService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.userId = localStorage.getItem('userId') as string;
    this.GetById(this.productId)
    this.GetAllDishes();

  }
  GetById(id:string){
    this.dishService.GetById(id).subscribe(resp =>{
      this.Dish = resp.data
      console.log(this.Dish);

      this.dishPrice = this.Dish.price;
      this.ingredientsPrice=0;
      this.Dish.ingredients?.forEach((item:any)=>{
        this.ingredientsPrice+=item.ingredient.price;
      })
      this.Dish.videoURL = resp.data.videoURL.split('.be/')[1]
    })
  }
  GetAllDishes(){
    this.dishService.GetAllDishes().subscribe(resp =>{
      this.Dishes = resp.data
    })
  }
  productInfo(id:string){
    this.router.navigate(['products/product-info/',id])
  }
  cartRequest:CartRequestDTO = new CartRequestDTO();
  getIngredients(){
    this.cartRequest.id = this.userId;
    this.Dish.ingredients.forEach((item:any)=>{
      var ingredientObj:CartRequestItem = new CartRequestItem();
      ingredientObj.name = item.ingredient.name
      ingredientObj.price = item.ingredient.price
      ingredientObj.qty = item.qty;
      this.cartRequest.items.push(ingredientObj);
    })
    this.cartService.AddItems(this.cartRequest).subscribe(resp=>{
      this.router.navigate(['products'])
        .then(() => {
          window.location.reload();
        });
    })
  }
  getDish(){
    this.cartRequest.id = this.userId;
    var obj:CartRequestItem = new CartRequestItem();
    obj.name = this.Dish.name;
    obj.price = this.Dish.price;
    obj.qty = 1;
    this.cartRequest.items.push(obj);
    this.cartService.AddItems(this.cartRequest).subscribe(resp=>{
      this.router.navigate(['products'])
        .then(() => {
          window.location.reload();
        });
    })
  }

}
