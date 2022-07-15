import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceResponse } from '../../Models/ServiceResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private BaseUrl = "http://cheapandtasty-001-site1.ctempurl.com/api/";
  constructor(private http: HttpClient) {}
  GetAll(){
    return this.http.get<ServiceResponse>(this.BaseUrl+"Categories/GetAll");
  }
}
