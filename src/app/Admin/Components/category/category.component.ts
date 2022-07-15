import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/Categories.service';
import { Category } from '../../Models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  Categories: Category[] = [];
  constructor(private catService: CategoryService) { }

  ngOnInit(): void {
    this.catService.GetAll().subscribe(data => {
      this.Categories = data.data;
      console.log(this.Categories);

    })
  }

}
