import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../helpers/auth.guard";

import { Role } from "../models/role";
import { EditComponent } from './edit.component';
import { LayoutComponent } from './layout.component';
import { UserComponent } from './user.component';
import { AdminComponent } from "./admin.component";
import {UserlistComponent} from "./userlist.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: UserComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'userlist', component: UserlistComponent },
      { path: 'user', component: UserComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
