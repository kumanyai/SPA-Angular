import { Component, OnInit } from '@angular/core';
import {IProduct} from './product';
import {ProductService} from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pagetittle = 'Lista de producto';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage:string;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
//
  set listFilter(value: string) {
    this._listFilter = value;
    this.filterProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filterProducts: IProduct[];
  products: IProduct[] = [];

  constructor(private productService: ProductService) {

    // this.listFilter = 'cart'
  }

  onRatingClicked(message: string): void {
    this.pagetittle = `Lista de Productos ${message}`;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase(); //Convertirmos los criterios de filtros a minusculas Se hace para no tener problemas con mayusculas
    return this.products.filter((product: IProduct) => //Decolvemos la lista filtrada
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  //ESTA CLASE SIMPLEMENTE SE SUSCRIBE AL OBSERVABLE QUE ESTA EN EL PRODUCT.SERVICE Y ESPERA DATOS O UNA NOTIFICACION
  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filterProducts = this.products;
      },
      error => this.errorMessage = <any>error //la <any> es un operador de casting es decir estamos emitiendo el error de devuelto
    );

  }

}
