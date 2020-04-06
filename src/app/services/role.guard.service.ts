import { AuthService } from "./../services/auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "./token-storage.service";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private _tokenService: TokenStorageService,
    private _router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this._tokenService.getUser();
    const MyRole = user.roles.includes(next.data.role);
    if (user.roles.some(x => x === next.data.role)) {
      return true;
    }

    // navigate to not found page
    this._router.navigate(["/404"]);
    return false;
  }
}
