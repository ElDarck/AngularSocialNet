import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './helpers/auth.guard';
import { MainComponent } from "./layout/main/main.component";

const accountModule = () => import("./account/account.module").then(x => x.AccountModule);
const usersModule = () => import("./users/users.module").then(x => x.UsersModule);

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
