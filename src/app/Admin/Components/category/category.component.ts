import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/Categories.service';
import { Category } from '../../../Models/Category';
import { CategoryRequest } from '../../../Models/CategoryRequest';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  Categories: Category[] = [];
  disable:boolean = false;
  createdCategoryId:string;
  CategoryName:string;
  buttonName:string;
  constructor(private catService: CategoryService) { }

  ngOnInit(): void {
    this.GetAll()
  }
  GetAll(){
    this.catService.GetAll().subscribe(data => {
      this.Categories = data.data;
    })
  }
  CreateCategory(){
    this.catService.CreateCategory().subscribe(data => {
      this.createdCategoryId = data.data.id;
      this.buttonName = "Create";
      this.disable=true
    })
  }
  SaveCategory(){
    var CategoryRequest:CategoryRequest ={
      id: this.createdCategoryId,
      name: this.CategoryName
    }
    this.catService.UpdateCategory(CategoryRequest).subscribe(data => {
      if(data.isSuccess){
        this.disable=false;
        this.CategoryName="";
        this.GetAll();
      }
    })
  }
  deleteCategory(id:string){
    this.catService.DeleteCategory(id).subscribe(data => {
      if(data.isSuccess) this.GetAll()
    })
  }
  editCategory(obj:any){
    this.CategoryName = obj.name;
    this.createdCategoryId = obj.id;
    this.disable = true;
    this.buttonName = "Update";
  }
}
