import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  public produits:any;
  public size:number=5;
  public currentPage:number=0;
  public totalPages:number;
  public pages : Array<number>;
  public currentKeyword: string;

  constructor(private catService:CatalogueService,private router:Router) {

  }

  ngOnInit(): void {

  }

  onGetProducts() {
     this.catService.getProducts(this.currentPage,this.size)
       .subscribe(data=>{
       this.totalPages=data["page"].totalPages;
       this.pages = new Array<number>(this.totalPages);
       this.produits = data;
     },err=>{
       console.log(err);
     })
  }

  onPageProduct(i: number) {
    this.currentPage = i;
    this.chercherProduits();
  }

   onChercher(form: any) {
    this.currentPage = 0;
    this.currentKeyword = form.keyword;
    this.chercherProduits();
  }

  chercherProduits() {
    this.catService.getProductsByKeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data=>{
        this.totalPages=data["page"].totalPages;
        this.pages = new Array<number>(this.totalPages);
        this.produits = data;
      },err=>{
        console.log(err);
      })

  }


  onDeleteProduct(p) {
    let conf = confirm("Etes vous sur ?");
    if(conf) {
      //console.log(p);
      this.catService.deleteResource(p._links.self.href)
        .subscribe(data=>{
        this.chercherProduits();
      },err=>{
        console.log(err);
      })
    }

  }

  onEditProduct(p) {
    let url = p._links.self.href;
    this.router.navigateByUrl("/edit-product/"+btoa(url));
  }
}
