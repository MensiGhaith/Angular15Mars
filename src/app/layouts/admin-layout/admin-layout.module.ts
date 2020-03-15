import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { AfficherComponent } from "../../afficher/afficher.component";

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatIconModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatCardModule,
  MatToolbarModule,
  MatAutocompleteModule
} from "@angular/material";
import { EnAttenteComponent } from "app/en-attente/en-attente.component";
import { DropZoneComponent } from "app/drop-zone/drop-zone.component";
import { NgxPaginationModule } from "ngx-pagination";
import { AuthService } from "app/services/auth.service";
import { AuthGuard } from "app/services/auth.guard";
import { UserDetailsComponent } from "../../user-details/user-details.component";
import { MatRadioModule } from "@angular/material";
import { MatChipsModule } from "@angular/material/chips";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
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
    MatAutocompleteModule
  ],
  declarations: [
    UserProfileComponent,
    TableListComponent,

    EnAttenteComponent,
    DropZoneComponent,
    AfficherComponent,
    UserDetailsComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  entryComponents: [UserDetailsComponent]
})
export class AdminLayoutModule {}
