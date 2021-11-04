import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../helpers/auth.guard";

import { Role } from "../models/role";
import { EditComponent } from './edit.component';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AdminComponent } from "../admin/admin.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'add', component: EditComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
