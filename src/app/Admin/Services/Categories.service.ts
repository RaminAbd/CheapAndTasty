import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceResponse } from '../../Models/ServiceResponse';
import { CategoryRequest } from '../../Models/CategoryRequest';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private BaseUrl = "http://cheapandtasty-001-site1.ctempurl.com/api/";
  constructor(private http: HttpClient) {}
  GetAll(){
    return this.http.get<ServiceResponse>(this.BaseUrl+"Categories/GetAll");
  }
  CreateCategory(){
    return this.http.get<ServiceResponse>(this.BaseUrl+"Categories/CreateCategory");
  }
  UpdateCategory(request:CategoryRequest){
    return this.http.post<ServiceResponse>(this.BaseUrl+"Categories/UpdateCategory", request);
  }
  DeleteCategory(id:string){
    return this.http.delete<ServiceResponse>(this.BaseUrl+`Categories/DeleteCategory/${id}`);
  }
  GetById(id:string){
    return this.http.get<ServiceResponse>(this.BaseUrl+`Categories/GetById/${id}`);
  }

}
