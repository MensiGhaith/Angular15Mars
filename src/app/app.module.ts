import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";

import { AppComponent } from "./app.component";

import { UserProfileComponent } from "./user-profile/user-profile.component";
import { TableListComponent } from "./table-list/table-list.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { AgmCoreModule } from "@agm/core";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { EnAttenteComponent } from "./en-attente/en-attente.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth.guard";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { DatahubComponent } from "./datahub/datahub.component";
import { RoleGuard } from "./services/role.guard.service";
import { GPComponent } from "./gp/gp.component";
import { authInterceptorProviders } from "./helpers/auth.interceptor";
import { HomeComponent } from "./home/home.component";
import { UploadComponent } from "./upload/upload.component";
import { NgxPaginationModule } from "ngx-pagination";
import { ProfilComponent } from "./profil/profil.component";
import {
  MatButtonModule,
  MatRippleModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatIconModule,
  MatDialogModule,
  MatRadioModule,
  MatCardModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatChipsModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material";
import { CometComponent } from "./comet/comet.component";
import { FileDetailsComponent } from "./file-details/file-details.component";

@NgModule({
  imports: [
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxPaginationModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatCardModule,
    MatToolbarModule,
    MatChipsModule,
    MatAutocompleteModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    DatahubComponent,
    GPComponent,
    HomeComponent,
    UploadComponent,
    ProfilComponent,
    CometComponent,
    FileDetailsComponent,
  ],

  providers: [
    AuthService,
    AuthGuard,
    RoleGuard,
    authInterceptorProviders,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  entryComponents: [FileDetailsComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
