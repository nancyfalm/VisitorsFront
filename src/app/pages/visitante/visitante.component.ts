import { Component, OnInit } from '@angular/core';
import { VisitanteModel } from 'src/app/models/visitante.model';
import { NgForm } from '@angular/forms';
import { VisitantesService } from 'src/app/services/visitantes.service';
import  Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-visitante',
  templateUrl: './visitante.component.html',
  styleUrls: ['./visitante.component.css']
})
export class VisitanteComponent implements OnInit {

  visitante = new VisitanteModel();

  constructor(private visitanteService: VisitantesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if( id !== 'nuevo' ){
      this.visitanteService.getVisitante( id )
      .subscribe( (resp: VisitanteModel) => {
        this.visitante = resp;
        this.visitante.id = +id;
      })
    }
  }

  guardarVisitante( form: NgForm){
    if(form.invalid){
      console.log('formulario invalido');
      return;
    }
    
    Swal.fire({
      title:'Espere',
      text:'Guardando informacion',
      type:'info',
      allowOutsideClick:false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.visitante.id){

      peticion = this.visitanteService.actualizarVisitante(this.visitante);

    } else {

      peticion = this.visitanteService.crearVisitante(this.visitante);

    }

    peticion.subscribe(resp =>{ 

      Swal.fire({
        title:this.visitante.nombre,
        text:'Se actualizo correctamente',
        type:'success',
      });

    });

  }

}
