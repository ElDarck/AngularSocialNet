import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from "./users.routing.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatNativeDateModule } from "@angular/material/core";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { MatIconModule } from "@angular/material/icon";

import { LayoutComponent } from "./layout.component";
import { UserComponent } from "./user.component";
import { AdminComponent } from "./admin.component";
import { UserlistComponent } from "./userlist.component";
import { DialogAddEdit } from "../matDialog/dialog-add-edit.component";
import { DeleteUserComponent } from "../matDialog/delete-user.component";
import { TranslateModule } from "@ngx-translate/core";
import { UserInfoComponent } from "../matDialog/user-info.component";
import { PipeModule } from "../helpers/pipes/pipe.module";
import {PhotoBase64Component} from "../matDialog/image-upload.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MatDialogModule,
    MatNativeDateModule,
    Ng2SearchPipeModule,
    FormsModule,
    TranslateModule,
    MatIconModule,
    PipeModule,
  ],
  declarations: [
    LayoutComponent,
    UserComponent,
    AdminComponent,
    UserlistComponent,
    DialogAddEdit,
    DeleteUserComponent,
    UserInfoComponent,
    PhotoBase64Component
  ],
  entryComponents: [ DialogAddEdit, DeleteUserComponent, UserInfoComponent, PhotoBase64Component ],
})
export class UsersModule { }
