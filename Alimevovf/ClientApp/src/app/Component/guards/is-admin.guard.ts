import { AuthService } from "../../services/auth.service";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate{
  constructor(private auth: AuthService) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.isAdmin();
  }
}
