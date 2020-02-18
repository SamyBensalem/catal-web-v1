import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Product} from '../model/product.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {


  public host:string = "http://localhost:8080";



  constructor(private httpClient:HttpClient,private router:Router) { }

  public getProducts(page:number,size:number){
    return this.httpClient.get(this.host+"/produits?page="+page+"&size="+size);
  }


  public getProductsByKeyword(mc:string,page:number,size:number){
    return this.httpClient.get(this.host+"/produits/search/byDesignationPage?mc="+mc+"&page="+page+"&size="+size);
  }


  public deleteResource(url){
    return this.httpClient.delete(url);
  }


  public saveResource(url,data):Observable<Product> {
    console.log(this.httpClient.post(url,data));
    return this.httpClient.post<Product>(url,data);
  }

  getResource(url):Observable<Product>{
    return this.httpClient.get<Product>(url);
  }

  updateResource(url,data):Observable<Product>{
    return this.httpClient.put<Product>(url,data);
  }
}
