import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../helpers/auth.guard";

import { Role } from "../../models/role";
import { LayoutComponent } from './layout.component';
import { UserComponent } from './user.component';
import { AdminComponent } from "./admin.component";
import {UserlistComponent} from "./userlist.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: UserComponent },
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
