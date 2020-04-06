import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { TokenStorageService } from "./token-storage.service";
@Injectable()
export class AuthGuard implements CanActivate {
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    debugger;
    return false;
  }

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private _router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      return true;
    }

    // navigate to login page
    this._router.navigate(["/login"]);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
