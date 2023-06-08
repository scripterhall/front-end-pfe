import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SelectProjetComponent } from "./pages/select-projet/select-projet.component";
import { DecisionComponent } from "./pages/decision/decision.component";
import { InscriptionComponent } from "./auth/inscription/inscription.component";
import { AuthentificationComponent } from "./auth/authentification/authentification.component";
import { SelectProjetMembreComponent } from "./pages/select-projet-membre/select-projet-membre.component";
import { AuthGuard } from "./service/auth.guard";
import { AuthDisableGuard } from "./service/auth-disable.guard";
import { MotDePassOublierComponent } from "./pages/mot-de-pass-oublier/mot-de-pass-oublier.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layouts/admin-layout/admin-layout.module").then(m => m.AdminLayoutModule)
      }
    ]
  }, {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layouts/auth-layout/auth-layout.module").then(m => m.AuthLayoutModule)
      }
    ]
  },
  {
    path:"liste-projet",
    component:SelectProjetComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"liste-projet-membre",
    component:SelectProjetMembreComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"inscription",
    component:InscriptionComponent
  },
  {
    path:"auth",
    component:AuthentificationComponent,
    canActivate: [AuthDisableGuard]
  },
  {
    path:"decision/:idProjet/membres/:idMembre/:token",
    component:DecisionComponent
  },
  {
    path:"mot-de-pass-reset",
    component:MotDePassOublierComponent
  },
  {
    path: "**",
    redirectTo: "dashboard"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
