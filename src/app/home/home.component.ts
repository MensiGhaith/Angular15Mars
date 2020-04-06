import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "app/services/token-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  private roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showDatahubBoard = false;
  showGpBoard = false;
  username: String;
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes("ADMIN");
      this.showDatahubBoard = this.roles.includes("DATAHUB");
      this.showGpBoard = this.roles.includes("GP");

      this.username = user.username;
    }
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
