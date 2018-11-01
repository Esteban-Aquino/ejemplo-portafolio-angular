import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargado = false;
  productosIdx: ProductosIdx[] = [ { } ];
  productosIdxFiltrado: ProductosIdx[] = [ { } ];
  constructor(private http: HttpClient) {
    this.CargarProductos();
  }

  private CargarProductos() {
    return new Promise((resolve, reject) => {
      this.http.get('https://ejemplo-angular-hmtl.firebaseio.com/productos_idx.json')
      .subscribe((resp: ProductosIdx[]) => {
        this.productosIdx = resp;
       // setTimeout(() => {this.cargado = true; }, 2000);
       this.cargado = true;
        resolve();
      });
    });

  }
  public getDetalleProducto(id: string) {
    return this.http.get(`https://ejemplo-angular-hmtl.firebaseio.com/productos/${ id }.json`);
  }
  public buscarProducto(termino: string) {
    if (isUndefined(this.productosIdx[0].cod)) {
        // cargar productos
        this.CargarProductos().then( () => {
          // aplicar filtros
          this.filtrarProductos(termino);
        });
    } else {
       // aplicar filtros
       this.filtrarProductos(termino);
    }
  }
  private filtrarProductos(termino: string) {
    this.productosIdxFiltrado = [ { } ];
    this.productosIdx.forEach( prod => {
      if (prod.categoria.toLocaleUpperCase().indexOf(termino.toLocaleUpperCase()) >= 0 ||
          prod.titulo.toLocaleUpperCase().indexOf(termino.toLocaleUpperCase()) >= 0) {
          this.productosIdxFiltrado.push( prod );
      }
    });
  }
}
