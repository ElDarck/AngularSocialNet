import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from "./users.routing.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatNativeDateModule } from "@angular/material/core";
import { Ng2SearchPipeModule } from "ng2-search-filter";

import { LayoutComponent } from "./layout.component";
import { UserComponent } from "./user.component";
import { AdminComponent } from "./admin.component";
import { UserlistComponent } from "./userlist.component";
import { DialogAddEdit } from "../matDialog/dialog-add-edit.component";
import { DeleteUserComponent } from "../matDialog/delete-user.component";
import {TranslateModule} from "@ngx-translate/core";
import {UserInfoComponent} from "../matDialog/user-info.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        MatDialogModule,
        MatNativeDateModule,
        Ng2SearchPipeModule,
        FormsModule,
        TranslateModule
    ],
  declarations: [
    LayoutComponent,
    UserComponent,
    AdminComponent,
    UserlistComponent,
    DialogAddEdit,
    DeleteUserComponent,
    UserInfoComponent
  ],
  entryComponents: [ DialogAddEdit, DeleteUserComponent, UserInfoComponent ],
})
export class UsersModule { }
