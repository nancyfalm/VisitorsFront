import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VisitanteModel } from '../models/visitante.model';
import { map , delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisitantesService {

  private url = "http://localhost:8000/api"

  constructor( private http: HttpClient ) { }

  crearVisitante( visitante: VisitanteModel) {
    return this.http.post(`${ this.url }/visitors` , visitante)
    .pipe(
      map( (resp : any) => {
        visitante.id = resp.name;
        return visitante;
      })
    );
  }

  actualizarVisitante( visitante: VisitanteModel ) {
    const visitanteTemporal = {
      ...visitante // Creara una propiedad con el mismo nombre
    };
    delete visitanteTemporal.id;
    
    return this.http.put(`${ this.url }/visitors/${visitante.id}`, visitanteTemporal);
  }
  


  getVisitantes(){
    return this.http.get(` ${this.url}/visitors`)
    .pipe(
      map(this.crearArreglo),
      delay(1000)
    );
  }

  private crearArreglo ( visitorsObj: object) {
    const visitantes: VisitanteModel[] = [];

    Object.keys( visitorsObj ).forEach( key => {
      const visitor: VisitanteModel = visitorsObj[key];
      let visitorId = visitor.id.toString();
      visitorId = key;
      visitantes.push( visitor );

    });
    return visitantes;
  }

  getVisitante( id: string) {
    return this.http.get(`${ this.url }/visitors/${ id }`);
  }

  eliminarVisitante( id: number) {
    return this.http.delete(`${ this.url }/visitors/delete/${ id }`);
  }


}
