import { Component, OnInit } from '@angular/core';
import { DishService } from '../../../Services/Dishes.service';
import { Dish } from '../../../../Models/Dish';
import { ActivatedRoute, Router } from '@angular/router';
import { DishRequest } from '../../../../Models/DishRequest';
import { Category } from '../../../../Models/Category';
import { Ingredient } from '../../../../Models/Ingredient';
import { CategoryService } from '../../../Services/Categories.service';
import { IngredientService } from '../../../Services/Ingredients.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  disable:boolean = false;
  dishId:string;
  createdDishId:string;
  DishName:string;
  imageChangedEvent:any;
  image:any;
  extension:any;
  buttonName:string="Save";
  Dish:DishRequest = new DishRequest()
  DishObject:Dish = new Dish();
  Ingredients:Ingredient[] = [];
  Ingredient:Ingredient = new Ingredient();
  constructor(
    private service:DishService,
    private route: ActivatedRoute,
    private dishService:DishService,
    private router:Router,
    private categoryService:CategoryService,
    private ingredientService:IngredientService
    ) { }
  categoryId:string;

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId') as string;
    this.dishId = this.route.snapshot.paramMap.get('dishId') as string;
    this.dishService.GetById(this.dishId).subscribe(resp=>{
      this.DishObject = resp.data;
      // this.AddedIngredients = this.DishObject.ingredients;
      this.DishObject.ingredients.forEach(item=>{
        var ingredient:any = {
          ingredientId:item.id,
          qty:item.qty,
          dimension:item.dimension,
          name:item.ingredient.name
        }
        this.AddedIngredients.push(ingredient)
      })
    })
    this.ingredientService.GetAll().subscribe(resp=>{
      this.Ingredients = resp.data;
    })
  }
  handleUpload(event: any) {
    this.imageChangedEvent = event;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        var base64 = reader.result?.toString();
        if(base64!==null){
          this.image = base64?.split(',')[1];
          this.extension=`.${file.name.split('.')[1]}`;
        }
    };
  }
  SaveDish(){
    this.Dish.ingredients = this.AddedIngredients
    this.Dish.image = this.image;
    this.Dish.dishId = this.dishId;
    this.Dish.categoryId = this.categoryId
    this.Dish.name = this.DishObject.name;
    this.Dish.price = this.DishObject.price;
    this.Dish.description = this.DishObject.description;
    this.Dish.videoURL = this.DishObject.videoURL;
    this.dishService.UpdateDish(this.Dish).subscribe(data => {
      console.log(data);

      if(data.isSuccess){
        this.router.navigate(['admin/dishes/list'])
      }
    })

  }
  AddedIngredients:any[] = [];
  AddIngredient(ingr:any){
    var ingredient:any = {
      ingredientId:ingr.id,
      qty:ingr.qty,
      dimension:ingr.dimension,
      name:ingr.name
    }
    this.AddedIngredients.push(ingredient)
  }
  DeleteIngredient(id:string) {
    console.log(id);
    console.log(this.AddedIngredients);

    this.AddedIngredients = this.AddedIngredients.filter(item => item.ingredientId!== id);
    console.log(this.AddedIngredients);

  }
}
