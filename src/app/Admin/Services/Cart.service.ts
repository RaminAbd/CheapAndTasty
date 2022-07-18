import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceResponse } from '../../Models/ServiceResponse';
import { CategoryRequest } from '../../Models/CategoryRequest';
import { CartRequestDTO } from '../../Models/CartRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private BaseUrl = "http://cheapandtasty-001-site1.ctempurl.com/api/";
  constructor(private http: HttpClient) {}

  GetCartByUserId(userId:string){
    return this.http.get<ServiceResponse>(this.BaseUrl+`Cart/GetCartByUserId/${userId}`);
  }
  RemoveItem(object:any){
    return this.http.post<ServiceResponse>(this.BaseUrl+"Cart/RemoveItem", object);
  }
  AddItems(object:CartRequestDTO){
    return this.http.post<ServiceResponse>(this.BaseUrl+"Cart/AddItems",object);
  }
  Clear(userId:string){
    return this.http.get<ServiceResponse>(this.BaseUrl+`Cart/Clear/${userId}`);
  }
}
