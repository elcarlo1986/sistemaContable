import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

import { Asiento, Concepto } from "../../shared/asiento.model";

@Component({
  selector: 'app-asientos-realizados',
  templateUrl: './asientos-realizados.component.html',
  styleUrls: ['./asientos-realizados.component.css']
})
export class AsientosRealizadosComponent implements OnInit {

  private asiento: Asiento[];
  private filtrado: Asiento[];


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    

    this.authService.getAsientos().subscribe(asiento => {
      this.asiento = asiento;
    },
    err => {
      console.log(err);
      return false;
    });
  }



}
