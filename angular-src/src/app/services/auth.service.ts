import { Injectable } from '@angular/core';

import { Http, Headers, Request, Response, URLSearchParams, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";

import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/usuarios/registrar', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/usuarios/autenticar', user, {headers: headers})
      .map(res => res.json());

  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/usuarios/perfil', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  saveAsiento(asiento){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/asientos/agregar', asiento, {headers: headers})
      .map(res => res.json());
  }


  getAsientos(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/asientos/guardados', {headers: headers})
      .map(res => res.json());
  }

  getFiltrarAsientos(cuenta){
    // let headers = new Headers();
    // let params = new URLSearchParams();
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    // headers.append('Content-Type', 'application/json');
    // params.append('concepto', cuenta);
    // let options = new RequestOptions({headers: headers, params: params});    
    return this.http.get('http://localhost:3000/asientos/filtrar?concepto='+cuenta)
      .map(res => res.json())
      .map(asientos => {
        return asientos.map(asiento =>{
          return {
            fecha: asiento.fecha,
            debe: asiento.debe,
            haber: asiento.haber
          };
        })
      });
  }



}