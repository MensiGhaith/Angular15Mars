import { Routes } from "@angular/router";

import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { EnAttenteComponent } from "app/en-attente/en-attente.component";
import { DropZoneComponent } from "app/drop-zone/drop-zone.component";
import { LoginComponent } from "app/login/login.component";
import { AfficherComponent } from "app/afficher/afficher.component";
import { AuthGuard } from "app/services/auth.guard";

export const AdminLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
  {
    path: "",

    children: [
      {
        path: "affiche",
        component: AfficherComponent
      }
    ]
  },
  {
    path: "",

    children: [
      {
        path: "user-profile",
        component: UserProfileComponent
      }
    ]
  },

  {
    path: "",
    //  canActivateChild: [AuthGuard],
    children: [
      {
        path: "table-list",
        component: TableListComponent
      }
    ]
  },
  {
    path: "",
    //canActivateChild: [AuthGuard],
    children: [
      {
        path: "attente",
        component: EnAttenteComponent
      }
    ]
  },
  {
    path: "",

    children: [
      {
        path: "ajoutFichier",
        component: DropZoneComponent
      }
    ]
  }
];
