import { ActivatedRouteSnapshot, CanDeactivate, CanDeactivateFn, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
  }

  export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> =
  ( component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    return component.canDeactivate();
  }