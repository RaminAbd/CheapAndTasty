import { Component, OnInit } from '@angular/core';
import { DishService } from '../../Admin/Services/Dishes.service';
import { Dish } from '../../Models/Dish';
import { Category } from '../../Models/Category';
import { CategoryService } from '../../Admin/Services/Categories.service';
import { AuthService } from '../../Services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  Dishes:Dish[] = []
  Categories:Category[] = []
  showLogin:boolean = false
  showFilterBox:boolean = false
  HighlightRow : number;
  ClickedRow:any
  clickedAll:boolean = true;
  filterObject:any = {
    'From':0,
    'To':0
  }
  constructor(private dishService:DishService, private categoryService:CategoryService, private authService:AuthService, private router:Router) {
     this.ClickedRow = (index:any)=>{
      if(index!==-1){
        this.HighlightRow = index;
        this.clickedAll = false
      }
      else{
        this.clickedAll=true;
        this.HighlightRow=-1
        this.GetAllDishes();
      }
    }
}

  ngOnInit(): void {
    this.showLogin = this.authService.isLoggedIn ? false : true;
    console.log(this.showLogin);
    this.GetAllDishes();
    this.GetAllCategories();
  }
  GetAllDishes(){
    this.dishService.GetAllDishes().subscribe(resp =>{
      this.Dishes = resp.data
      console.log(resp.data);

    })
  }
  GetAllCategories(){
    this.categoryService.GetAll().subscribe(resp =>{
      this.Categories  = resp.data
      console.log(resp.data);

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
    this.dishService.Filter(this.filterObject).subscribe(resp =>{
      console.log(resp.data);
      this.Dishes = resp.data;
      this.showFilterBox = false
    })
  }
  productInfo(id:string){
    this.router.navigate(['products/product-info/',id])
  }
}
