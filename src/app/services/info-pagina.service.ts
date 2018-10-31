import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { Equipo } from '../interfaces/equipo.ingerface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  equipo: Equipo[] = [{}];
  cargada = false;
  constructor(private http: HttpClient) {
    this.cargarInfo ();
    this.cargarEquipo ();
    console.log('Servicio Listo....');
   }
   private cargarInfo () {
    // Leer archivo Json
    this.http.get('assets/data/data-pagina.json')
             .subscribe((resp: InfoPagina) => {
               this.cargada = true;
               this.info = resp;
                // console.log(resp);
             });
   }
   private cargarEquipo () {
    // Leer archivo Json
    this.http.get('https://ejemplo-angular-hmtl.firebaseio.com/eaquino.json')
             .subscribe((resp: Equipo[]) => {
               this.cargada = true;
               this.equipo = resp;
                // console.log(resp);
             });
   }
}
