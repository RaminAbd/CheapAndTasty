import { Component, OnInit } from '@angular/core';
import { DishService } from '../../../Services/Dishes.service';
import { Dish } from '../../../../Models/Dish';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  Dishes:Dish[] = [];
  constructor(private dishService:DishService) { }

  ngOnInit(): void {
   this.GetAllDishes();
  }
  GetAllDishes(){
    this.dishService.GetAllDishes().subscribe(dishes => {
      this.Dishes = dishes.data;
      console.log(this.Dishes);
    })
  }
  returnUrl(url:string){
    console.log(url);
    return url;
  }
  editCategory(item:any){

  }
  deleteCategory(id:string){
    this.dishService.DeleteDish(id).subscribe(resp=>{
      this.GetAllDishes();
    })
  }
}
