import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from "./login.component";
import { RegistrationComponent } from "./registration.component";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    TranslateModule,
    NgxSpinnerModule
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegistrationComponent
  ]
})
export class AccountModule { }
