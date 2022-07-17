import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceResponse } from '../../Models/ServiceResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private BaseUrl = "http://cheapandtasty-001-site1.ctempurl.com/api/";
  constructor(private http: HttpClient) {}
  GetAllOrders(){
    return this.http.get<ServiceResponse>(this.BaseUrl+"Orders/GetAllOrders");
  }
  CompeleteOrder(orderId:string){
    return this.http.get<ServiceResponse>(this.BaseUrl+`Orders/CompeleteOrder/${orderId}`);
  }
}
