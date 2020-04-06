import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./services/auth.guard";
import { DatahubComponent } from "./datahub/datahub.component";
import { RoleGuard } from "./services/role.guard.service";
import { GPComponent } from "./gp/gp.component";
import { HomeComponent } from "./home/home.component";
import { UploadComponent } from "./upload/upload.component";
import { ProfilComponent } from "./profil/profil.component";
import { CometComponent } from "./comet/comet.component";

const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "profil",
    component: ProfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "upload",
    component: UploadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "datahub",
    component: DatahubComponent,
    canActivate: [RoleGuard],
    data: { role: "DATAHUB" },
  },
  {
    path: "gp",
    component: GPComponent,
    canActivate: [RoleGuard],
    data: { role: "GP" },
  },
  {
    path: "comet",
    component: CometComponent,
    canActivate: [RoleGuard],
    data: { role: "COMET" },
  },

  {
    path: "",

    component: AdminLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: "ADMIN" },

    children: [
      {
        path: "",

        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule",
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
