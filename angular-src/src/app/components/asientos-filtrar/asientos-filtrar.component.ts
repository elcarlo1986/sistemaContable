import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

import { Asiento, Concepto } from "../../shared/asiento.model";
import { FlashMessagesService } from "angular2-flash-messages";



@Component({
  selector: 'app-asientos-filtrar',
  templateUrl: './asientos-filtrar.component.html',
  styleUrls: ['./asientos-filtrar.component.css']
})
export class AsientosFiltrarComponent implements OnInit {

  asiento: Asiento[] = [];

  cuenta: String;

  saldoInicial = 100000;

  balance = {
    balance: 0,
    montoDebe: 0,
    montoHaber: 0
  };

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,  
    private router: Router
  ) { }

  ngOnInit() {

    
  }

  onFiltrar(){

    let query = { "concepto": this.cuenta };

    this.authService.getFiltrarAsientos(query).subscribe(asientos => {
      this.asiento = asientos;
    },
    err => {
      console.log(err);
      return false;
    });
    
    console.log(this.asiento);

    // if(this.asiento != []){
    //   this.getBalance(this.asiento, this.balance);
    // }else{
    //   this.flashMessage.show('No exiten asientos con la cuenta seleccionada', {cssClass: 'alert-danger', timeout: 3000});
    //   this.router.navigate(['/asientosFiltrar']);
    // }



  }

  getBalance(asiento, balance){

    let montoDebe = 0;
    let montoHaber = 0;

    for (let i = 0; i < asiento.length; i++) {
      for (let j = 0; j < asiento[i].conceptoDebe.length; j++) {
        montoDebe += asiento[i].conceptoDebe[j].monto;
      }
      
      for (let k = 0; k < asiento[i].conceptoHaber.length; k++) {
  
        montoHaber += asiento[i].conceptoHaber[k].monto;
        
      }
    }

    balance.resultado = this.saldoInicial + montoDebe - montoHaber;
    balance.montoDebe = montoDebe;
    balance.montoHaber = montoHaber;
  }


}
