import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceResponse } from '../../Models/ServiceResponse';
import { IngredientRequestDTO } from '../../Models/IngredientRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private BaseUrl = "http://cheapandtasty-001-site1.ctempurl.com/api/";
  constructor(private http: HttpClient) {}
  GetAll(){
    return this.http.get<ServiceResponse>(this.BaseUrl+"Ingredients/GetAll");
  }
  CreateIngredient(){
    return this.http.get<ServiceResponse>(this.BaseUrl+"Ingredients/CreateIngredient");
  }
  Update(request:IngredientRequestDTO){
    return this.http.post<ServiceResponse>(this.BaseUrl+"Ingredients/Update", request)
  }
  DeleteIngredientById(id:string){
    return this.http.delete<ServiceResponse>(this.BaseUrl+`Ingredients/DeleteIngredientById/${id}`)
  }
}
