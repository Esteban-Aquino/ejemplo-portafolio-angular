import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargado = false;
  productosIdx: ProductosIdx[] = [ { } ];
  constructor(private http: HttpClient) {
    this.CargarProductos();
  }

  private CargarProductos() {
    this.http.get('https://ejemplo-angular-hmtl.firebaseio.com/productos_idx.json')
             .subscribe((resp: ProductosIdx[]) => {
               this.productosIdx = resp;
              // setTimeout(() => {this.cargado = true; }, 2000);
              this.cargado = true;
               // console.log(resp);
             });
  }
}
