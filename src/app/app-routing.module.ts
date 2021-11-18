import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './helpers/auth.guard';
import { MainComponent } from "./layout/main/main.component";

const accountModule = () => import("./components/account/account.module").then(x => x.AccountModule);
const usersModule = () => import("./components/users/users.module").then(x => x.UsersModule);

const routes: Routes = [
  { path: 'main', component: MainComponent},
  { path: '', redirectTo: '/account/login', pathMatch: 'full'},
  { path: 'user', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
