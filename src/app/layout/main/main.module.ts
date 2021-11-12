import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";

import { AccountRoutingModule } from "../../account/account-routing.module";
import { UsersModule } from "../../users/users.module";
import { AccountModule } from "../../account/account.module";
import { FooterComponent } from "../../components/footer/footer.component";
import { ContentComponent } from "../../components/content/content.component";
import { HeaderComponent } from "../../components/header/header.component";


@NgModule({
  declarations: [
    FooterComponent,
    ContentComponent,
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
    ContentComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    AccountRoutingModule,
    UsersModule,
    AccountModule,
    TranslateModule,
    MatButtonModule,
    MatMenuModule,
  ]
})
export class MainModule { }
