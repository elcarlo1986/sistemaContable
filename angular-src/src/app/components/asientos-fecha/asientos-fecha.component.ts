import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from "@angular/forms";

import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";


import { Asiento, Concepto } from "../../shared/asiento.model";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-asientos-fecha',
  templateUrl: './asientos-fecha.component.html',
  styleUrls: ['./asientos-fecha.component.css']
})
export class AsientosFechaComponent implements OnInit {

  asientos: Asiento[];
  fechaInicio: string = '';
  fechaFin: string = '';
  mostrar = false;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,  
    private router: Router,
  ) { }

  ngOnInit() {
  }
  onFiltrar(){
    
    this.authService.getFiltrarAsientosFecha(this.fechaInicio, this.fechaFin).subscribe(asientos => {
      this.asientos = asientos;
      if(this.asientos){
        this.mostrar = true;
        console.log(this.asientos);
        
      }else{
        this.flashMessage.show('No exiten asientos en el periodo establecido', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/asientosFiltrar']);
      }
    
      },
      err => {
        console.log(err);
        return false;
    });

    


  }

}
