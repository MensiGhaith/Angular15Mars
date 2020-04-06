import { Component } from "@angular/core";
import * as AOS from "aos";
import { Router } from "@angular/router";
import { TokenStorageService } from "./services/token-storage.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  private roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showDatahubBoard = false;
  showGpBoard = false;
  showCometBoard = false;
  username: String;
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit() {
    AOS.init();

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes("ADMIN");
      this.showDatahubBoard = this.roles.includes("DATAHUB");
      this.showGpBoard = this.roles.includes("GP");
      this.showCometBoard = this.roles.includes("COMET");

      this.username = user.username;
    }
  }
  logout() {
    this.tokenStorageService.signOut();

    window.location.reload();
  }
}
