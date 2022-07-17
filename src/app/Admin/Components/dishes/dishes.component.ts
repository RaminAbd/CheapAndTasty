import { Component, OnInit } from '@angular/core';
import { DishService } from '../../Services/Dishes.service';
import { Router } from '@angular/router';
import { Category } from '../../../Models/Category';
import { CategoryService } from '../../Services/Categories.service';
import { Dish } from '../../../Models/Dish';
import { IngredientService } from '../../Services/Ingredients.service';
import { Ingredient } from '../../../Models/Ingredient';
import { DishRequest } from '../../../Models/DishRequest';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  disable:boolean = false;
  dishId:string;
  createdDishId:string;
  DishName:string;
  imageChangedEvent:any;
  image:any;
  extension:any;
  buttonName:string="Save";
  Dish:DishRequest = new DishRequest()
  Categories:Category[]=[];
  Category:Category = new Category();
  Ingredients:Ingredient[] = [];
  Ingredient:Ingredient = new Ingredient();
  constructor(private service:DishService, private router:Router, private categoryService:CategoryService, private ingredientService:IngredientService) { }

  ngOnInit(): void {
    this.categoryService.GetAll().subscribe(resp=>{
      console.log(resp.data);
      this.Categories = resp.data;
    })
  this.ingredientService.GetAll().subscribe(resp=>{
    this.Ingredients = resp.data;
  })
  }
  CreateDish(){
    console.log(this.Category);

    this.service.CreateDish(this.Category.id).subscribe(resp => {
      console.log(resp);
      this.disable = true;
      this.router.navigate(['/admin/dishes/dish/',resp.data.id, this.Category.id])
      this.dishId = resp.data.id;
    })
  }


}
