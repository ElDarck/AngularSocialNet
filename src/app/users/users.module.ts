import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from "./users.routing.module";

import { LayoutComponent } from "./layout.component";
import { UserComponent } from "./user.component";
import { EditComponent } from "./edit.component";
import { AdminComponent } from "./admin.component";
import { UserlistComponent } from "./userlist.component";
import { DialogBodyComponent } from "../matDialog/dialogBody.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatNativeDateModule } from "@angular/material/core";
import {DeleteUserComponent} from "../matDialog/delete-user.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MatDialogModule,
    MatNativeDateModule,
  ],
  declarations: [
    LayoutComponent,
    UserComponent,
    EditComponent,
    AdminComponent,
    UserlistComponent,
    DialogBodyComponent,
    DeleteUserComponent
  ],
  entryComponents: [DialogBodyComponent,DeleteUserComponent],
})
export class UsersModule { }
