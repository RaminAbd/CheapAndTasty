import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DishService } from '../../Admin/Services/Dishes.service';
import { Dish } from '../../Models/Dish';
import { CartRequestDTO } from '../../Models/CartRequestDTO';
import { CartRequestItem } from '../../Models/CartRequestItem';

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
  constructor( private router:Router, private route:ActivatedRoute,private dishService:DishService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.userId = localStorage.getItem('userId') as string;
    this.GetById(this.productId)
    this.GetAllDishes();
  }
  GetById(id:string){
    this.dishService.GetById(id).subscribe(resp =>{
      console.log(resp.data);
      this.Dish = resp.data
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
      console.log(resp.data);
    })
  }
  productInfo(id:string){
    console.log(id);

    this.router.navigate(['products/product-info/',id])
  }
  cartRequest:CartRequestDTO = new CartRequestDTO();
  getIngredients(){
    this.cartRequest.id = this.userId;
    var ingredientObj:CartRequestItem = new CartRequestItem();

    this.Dish.ingredients.forEach((item:any)=>{
      ingredientObj.name = item.ingredient.name
      ingredientObj.price = item.ingredient.price
      ingredientObj.qty = item.qty;
      console.log(ingredientObj);
      this.cartRequest.items.push(ingredientObj);
    })
    console.log(this.cartRequest);

  }
}
