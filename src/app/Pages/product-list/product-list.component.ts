import { Component, OnInit } from '@angular/core';
import { DishService } from '../../Admin/Services/Dishes.service';
import { Dish } from '../../Models/Dish';
import { Category } from '../../Models/Category';
import { CategoryService } from '../../Admin/Services/Categories.service';
import { AuthService } from '../../Services/Auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  Dishes:Dish[] = []
  Categories:Category[] = []
  showLogin:boolean = false
  filterObject:any = {
    'From':0,
    'To':0
  }
  constructor(private dishService:DishService, private categoryService:CategoryService, private authService:AuthService) { }

  ngOnInit(): void {
    this.showLogin = this.authService.isLoggedIn ? false : true;
    console.log(this.showLogin);

    this.GetAllDishes();
    this.GetAllCategories();
  }
  GetAllDishes(){
    this.dishService.GetAllDishes().subscribe(resp =>{
      this.Dishes = resp.data
    })
  }
  GetAllCategories(){
    this.categoryService.GetAll().subscribe(resp =>{
      this.Categories = resp = resp.data
    })
  }
  GetAllDishesInCategory(id:string){
    console.log(id);
    this.dishService.GetAllDishesInCategory(id).subscribe(resp =>{
      this.Dishes = resp.data
    })
  }
  Filter(){
    console.log(this.filterObject);

  }
}
