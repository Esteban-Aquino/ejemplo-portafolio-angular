import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
 productoDescripcion: ProductoDescripcion = {};
 cargado = false;
 id: string;
  constructor(private route: ActivatedRoute,
              public _productoService: ProductosService) { }
  ngOnInit() {
    this.route.params.subscribe(parametros => {
      this._productoService.getDetalleProducto(parametros['id'])
          .subscribe((producto: ProductoDescripcion) => {
            this.productoDescripcion = producto;
            this.id = parametros['id'];
            this.cargado = true;
            // console.log(producto);
          });
    });
  }

}
