import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AsientosAgregarComponent } from './components/asientos-agregar/asientos-agregar.component';
import { AsientosRealizadosComponent } from './components/asientos-realizados/asientos-realizados.component';
import { AsientosFiltrarComponent } from './components/asientos-filtrar/asientos-filtrar.component';
import { AboutComponent } from './components/about/about.component';
import { ProfileComponent } from './components/profile/profile.component';


import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { FlashMessagesModule } from "angular2-flash-messages";
import { AuthGuard } from "./guards/auth.guard";

import { DropdownDirective } from "./shared/dropdown.directive";
import { Asiento, Concepto } from "./shared/asiento.model";



const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},  
  {path: 'asientosAgregar', component: AsientosAgregarComponent,canActivate:[AuthGuard]},
  {path: 'asientosRealizados', component: AsientosRealizadosComponent, canActivate:[AuthGuard]},
  {path: 'asientosFiltrar', component: AsientosFiltrarComponent, canActivate:[AuthGuard]},
  {path: 'about', component: AboutComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    AsientosAgregarComponent,
    AsientosRealizadosComponent,
    AsientosFiltrarComponent,
    AboutComponent,
    ProfileComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    ReactiveFormsModule,
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
