import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  authStatus: boolean;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authStatus = this.auth.isAuth;
  }
  OnSignIn() {
    this.auth.signIn().then(() => {
      this.router.navigate(["affiche"]);
      this.authStatus = this.auth.isAuth;
    });
  }
  OnSignOut() {
    this.auth.signOut();
    this.authStatus = this.auth.isAuth;
  }
}
