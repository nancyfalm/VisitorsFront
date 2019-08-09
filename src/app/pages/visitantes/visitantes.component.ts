import { Component, OnInit } from '@angular/core';
import { VisitantesService } from 'src/app/services/visitantes.service';
import { VisitanteModel } from 'src/app/models/visitante.model';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-visitantes',
  templateUrl: './visitantes.component.html',
  styleUrls: ['./visitantes.component.css']
})
export class VisitantesComponent implements OnInit {

  allVisitors: VisitanteModel[] = [];
  carga = false;
  
  constructor(private visitorsService: VisitantesService) { }

  ngOnInit() {
    this.carga = true;
    this.visitorsService.getVisitantes()
    .subscribe( resp => {
      this.allVisitors = resp
      this.carga = false;
    });
  }

  eliminarVisitante( visitante: VisitanteModel, i: number) {
    Swal.fire({
      title:'Esta seguro de querer eliminar?',
      type:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp => {
      if(resp.value){
        this.allVisitors.splice(i , 1);
        this.visitorsService.eliminarVisitante( visitante.id).subscribe();
      }
    });
  
  }

}
