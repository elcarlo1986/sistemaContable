import { Component, OnInit } from '@angular/core';

import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";

import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,      
      username: this.username,
      password: this.password
    }

    //Campos Requeridos
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Por favor complete todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Email Correcto
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Por favor ingrese un email valido', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Registrar Usuario
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Usuario registrado y puede iniciar sesion', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.show('Ha ocurrido un error', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/registrar']);
      }
    });

  }
}
