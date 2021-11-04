import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from "./users.routing.module";

import { LayoutComponent } from "./layout.component";
import { ListComponent } from "./list.component";
import { EditComponent } from "./edit.component";
import { AdminComponent } from "../admin/admin.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,

  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    EditComponent,
    AdminComponent
  ]
})
export class UsersModule { }
