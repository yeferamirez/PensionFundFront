import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { AperturasComponent } from './components/inicio/aperturas/aperturas.component';
import { CancelacionesComponent } from './components/inicio/cancelaciones/cancelaciones.component';
import { ReportesComponent } from './components/inicio/reportes/reportes.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [  
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},  
  {path: 'inicio',  component: InicioComponent, children:[
    {path: '', component: BienvenidaComponent},
    {path: 'aperturas', component: AperturasComponent},
    {path: 'cancelaciones', component: CancelacionesComponent},
    {path: 'reportes', component: ReportesComponent}
  ]},  
  {path: '**', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
