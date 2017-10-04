import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined){
      return false;
    }else{
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateAsiento(asiento){
    let montoDebe: number = 0;
    let montoHaber: number = 0;
    for (let i = 0; i < asiento.conceptoDebe.length; i++) {
      let monto = parseFloat(asiento.conceptoDebe[i].monto);
      montoDebe = montoDebe + monto; 
    }

    for (let i = 0; i < asiento.conceptoHaber.length; i++) {
      let monto = parseFloat(asiento.conceptoHaber[i].monto);
      montoHaber = montoHaber + monto;
    }

    if(montoDebe == montoHaber){
      return true;
    }else{
      return false;
    }
  }
}
