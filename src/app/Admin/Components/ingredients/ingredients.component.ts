import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../Services/Ingredients.service';
import { IngredientRequestDTO } from '../../../Models/IngredientRequestDTO';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  disable:boolean = false;
  buttonName:string;
  ingredientId:string;
  IngredientRequest:IngredientRequestDTO = new IngredientRequestDTO();

  constructor(private ingredientService: IngredientService) { }
  imageChangedEvent:any;
  image:any;
  ngOnInit(): void {
  }
  CreateIngredient(){
    this.ingredientService.CreateIngredient().subscribe(resp=>{
      this.ingredientId = resp.data.id;
      this.buttonName = "Create";
      this.disable=true
    })
  }
  SaveIngredient(){
    console.log(this.IngredientRequest);
    this.IngredientRequest.image = this.image;
    this.IngredientRequest.id = this.ingredientId;
    this.ingredientService.Update(this.IngredientRequest).subscribe(resp=>{
      if(resp.isSuccess){
        this.disable=false;
        // this.GetAll();
      }
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
          // this.extension=`.${file.name.split('.')[1]}`;
        }
    };
  }
}
