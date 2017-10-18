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

  asientos: Asiento[];

  cuenta: string;

  saldoInicial: number = 100000;

  balances: Balance[] = [];

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,  
    private router: Router,
  ) { }

  ngOnInit() {

   
    
    
  }


  onFiltrar(){

    this.authService.getFiltrarAsientos(this.cuenta).subscribe(asientos => {
      this.asientos = asientos;
      if(this.asientos){
        this.getBalance();
        console.log(this.asientos);
        console.log(this.balances);
        
      }else{
        this.flashMessage.show('No exiten asientos con la cuenta seleccionada', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/asientosFiltrar']);
      }
   
      },
      err => {
        console.log(err);
        return false;
    });

    


  }

  getBalance(){

    this.balances = [];

    let saldo = this.saldoInicial;

    let balance: Balance = {fecha: '', debe: 0 , haber: 0, saldo: 0};

    for (let asiento of this.asientos) {

      let balance: Balance = {fecha: '', debe: 0 , haber: 0, saldo: 0};
      
      
      balance.fecha = asiento.fecha;
      

      for (let j = 0; j < asiento.debe.length; j++) {
        if(asiento.debe[j].concepto === this.cuenta){
          balance.debe = asiento.debe[j].monto;
          balance.haber = 0;
          saldo = saldo + balance.debe;
        }
      }

      for (let j = 0; j < asiento.haber.length; j++) {
        if(asiento.haber[j].concepto === this.cuenta){
          balance.haber = asiento.haber[j].monto;
          balance.debe = 0;
          saldo = saldo - balance.haber;
        }
      }

      balance.saldo = saldo;

      this.balances.push(balance);
    }
  }


}
