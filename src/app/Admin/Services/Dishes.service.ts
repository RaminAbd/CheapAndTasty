import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceResponse } from '../../Models/ServiceResponse';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private BaseUrl = "http://cheapandtasty-001-site1.ctempurl.com/api/";
  constructor(private http: HttpClient) {}
  CreateDish(categoryId:string){
    return this.http.get<ServiceResponse>(this.BaseUrl+`Dish/CreateDish/${categoryId}`);
  }
  DeleteDish(id:string){
    return this.http.delete<ServiceResponse>(this.BaseUrl+`Dish/DeleteDish/${id}`);
  }
  UpdateDish(dishObject:any){
    return this.http.post<ServiceResponse>(this.BaseUrl+"Dish/UpdateDish", dishObject);
  }
  GetAllDishes(){
    return this.http.get<ServiceResponse>(this.BaseUrl+"Dish/GetAllDishes");
  }
}
