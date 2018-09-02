import { Component, OnInit } from '@angular/core';
import {IProduct} from "./product";

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
  products:IProduct[] = [
    {
      "productId": 1,
      "productName": "Leaf Rake",
      "productCode": "GDN-0011",
      "releaseDate": "March 19, 2016",
      "description": "Leaf rake with 48-inch wooden handle.",
      "price": 19.95,
      "starRating": 3.2,
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    },
    {
      "productId": 2,
      "productName": "Garden Cart",
      "productCode": "GDN-0023",
      "releaseDate": "March 18, 2016",
      "description": "15 gallon capacity rolling garden cart",
      "price": 32.99,
      "starRating": 4.2,
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
    }
  ];

  constructor(){
    this.filterProducts = this.products;
    this.listFilter = 'cart'
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
    console.log('in onit');
  }

}
