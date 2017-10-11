import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

import { Asiento, Concepto } from "../../shared/asiento.model";
import { FlashMessagesService } from "angular2-flash-messages";
import { Balance } from "../../shared/balance.model";


@Component({
  selector: 'app-asientos-filtrar',
  templateUrl: './asientos-filtrar.component.html',
  styleUrls: ['./asientos-filtrar.component.css']
})
export class AsientosFiltrarComponent implements OnInit {

  asiento: Asiento[] = [];

  cuenta: String;

  saldoInicial = 100000;

  balance: Balance[];

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
    balance[0].saldo = this.saldoInicial;

    for (let i = 0; i < asiento.length; i++) {
      balance[i].fecha = asiento[i].fecha;
      for (let j = 0; j < asiento[i].conceptoDebe.length; j++) {
        if(asiento[i].conceptoDebe[j].concepto = this.cuenta){
          balance[i].debe = asiento.conceptoDebe[j].monto;
          balance[i].haber = 0;
          balance[i].saldo += asiento.conceptoDebe[j].monto
        }
      }
      for (let j = 0; j < asiento[i].conceptoHaber.length; j++) {
        if(asiento[i].conceptoHaber[j].concepto = this.cuenta){
          balance[i].heber = asiento.conceptoHaber[j].monto;
          balance[i].debe = 0;
          balance[i].saldo -= asiento.conceptoDebe[j].monto      
        }
      }
    }

  //   let montoDebe = 0;
  //   let montoHaber = 0;

  //   for (let i = 0; i < asiento.length; i++) {
  //     for (let j = 0; j < asiento[i].conceptoDebe.length; j++) {
  //       montoDebe += asiento[i].conceptoDebe[j].monto;
  //     }
      
  //     for (let k = 0; k < asiento[i].conceptoHaber.length; k++) {
  
  //       montoHaber += asiento[i].conceptoHaber[k].monto;
        
  //     }
  //   }

  //   balance.resultado = this.saldoInicial + montoDebe - montoHaber;
  //   balance.montoDebe = montoDebe;
  //   balance.montoHaber = montoHaber;   
  }


}
