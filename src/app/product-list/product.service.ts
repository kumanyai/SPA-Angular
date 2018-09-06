///<reference path="../../../node_modules/@angular/core/src/di/injectable.d.ts"/>
import { Injectable } from '@angular/core';
import { IProduct } from './product';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError, tap  } from 'rxjs/operators'
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) {}
  //LA FORMA CORRECTA DE USAR EL HTTP ES ENCAPSULARLO EN UN SERVISIO Y LUEGO PONER UN OBSERVABLE
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log(`ALL: ${JSON.stringify(data)}`)),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse){
    //En una app real, nosotros necesitamos enviar algun dato o login a nuestro servidor
    let errorMessage = ``;
    if (err.error instanceof ErrorEvent){
      //Si en el lado del cliente ocurre un error, Handle dara el aviso
      errorMessage = `A ocurrido un error: ${err.error.message}`;
    } else {
      //El servidor(backend) retorna un codigo de error que no se dio la conexion
      //La respuesta la contiene el body cuando algo sale mal
      errorMessage = `Codigo retornado por el servidor: ${err.status}, El mensaje de error es: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  
}
