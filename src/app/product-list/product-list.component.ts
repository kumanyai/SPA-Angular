import { Component, OnInit } from '@angular/core';
import {IProduct} from "./product";
import {ProductService} from "./product.service";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  pagetittle: string = 'Lista de producto';
  imageWidth:number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  _listFilter:string;

  get listFilter(): string{
    return this._listFilter;
  }
//
  set listFilter(value:string){
    this._listFilter = value;
    this.filterProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filterProducts:IProduct[];
  products:IProduct[] = [];

  constructor(private productService: ProductService){

    // this.listFilter = 'cart'
  }

  onRatingClicked(message:string):void{
    this.pagetittle = `Lista de Productos ${message}`;
  }

  performFilter(filterBy:string):IProduct[]{
    filterBy = filterBy.toLowerCase(); //Convertirmos los criterios de filtros a minusculas Se hace para no tener problemas con mayusculas
    return this.products.filter((product:IProduct) => //Decolvemos la lista filtrada
      product.productName.toLocaleLowerCase().indexOf(filterBy) != -1);
  }

  toggleImage():void{
    this.showImage = !this.showImage;
  }

  ngOnInit():void{
    this.products = this.productService.getProducts();
    this.filterProducts = this.products;
  }

}
