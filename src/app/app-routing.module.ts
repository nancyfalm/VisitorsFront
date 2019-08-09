import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitantesComponent } from './pages/visitantes/visitantes.component';
import { VisitanteComponent } from './pages/visitante/visitante.component';

const routes: Routes = [
  {path: 'visitantes', component:VisitantesComponent},
  {path: 'visitante/:id', component:VisitanteComponent},
  {path: ' ', component:VisitantesComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
