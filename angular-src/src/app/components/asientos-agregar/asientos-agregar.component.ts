import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { Asiento } from "../../shared/asiento.model";

import { ValidateService } from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";

import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";



@Component({
  selector: 'app-asientos-agregar',
  templateUrl: './asientos-agregar.component.html',
  styleUrls: ['./asientos-agregar.component.css']
})
export class AsientosAgregarComponent implements OnInit {
  public myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      fecha: ['', [Validators.required]],
      debe: this.formBuilder.array([this.initConcepto()]),
      haber: this.formBuilder.array([this.initConcepto()])
    });
  }

  initConcepto() {
    // initialize concepto
    return this.formBuilder.group({
        concepto: ['', Validators.required],
        monto: ['', Validators.required]
    });
  }

  addConceptoDebe() {
    // add concepto to the list
    const control = <FormArray>this.myForm.controls['debe'];
    control.push(this.initConcepto());
  }
  addConceptoHaber() {
    // add concepto to the list
    const control = <FormArray>this.myForm.controls['haber'];
    control.push(this.initConcepto());
  }

  removeConceptoDebe(i: number) {
    // remove concepto from the list
    const control = <FormArray>this.myForm.controls['debe'];
    control.removeAt(i);
  }

  removeConceptoHaber(i: number) {
    // remove concepto from the list
    const control = <FormArray>this.myForm.controls['haber'];
    control.removeAt(i);
  }



  save(asiento: Asiento) {

    if(!this.validateService.validateAsiento(asiento)){
      this.flashMessage.show('Los montos del asiento no son correctos', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    
    // call API to save asiento

    this.authService.saveAsiento(asiento).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Asiento agregado', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/asientosAgregar']);
      }else{
        this.flashMessage.show('Ha ocurrido un error', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/asientosAgregar']);
      }
    });
  }
}
