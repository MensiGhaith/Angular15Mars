import { Component, OnInit } from "@angular/core";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/user-profile",
    title: "Profil Utilisateur",
    icon: "person",
    class: ""
  },
  {
    path: "/table-list",
    title: "Liste des utilisateurs",
    icon: "content_paste",
    class: ""
  },
  {
    path: "/attente",
    title: "En Attente",
    icon: "notifications",
    class: ""
  },
  {
    path: "/ajoutFichier",
    title: "Ajouter Fichier",
    icon: "library_books ",
    class: ""
  },

  {
    path: "/affiche",
    title: "Affiche",
    icon: "library_books",
    class: ""
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
