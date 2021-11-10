import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
import { ContentComponent } from "../../components/content/content.component";
import { HeaderComponent } from "../../components/header/header.component";

import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { AccountRoutingModule } from "../../account/account-routing.module";
import { UsersModule } from "../../users/users.module";
import { AccountModule } from "../../account/account.module";
import {TranslateModule} from "@ngx-translate/core";

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
    ]
})
export class MainModule { }
