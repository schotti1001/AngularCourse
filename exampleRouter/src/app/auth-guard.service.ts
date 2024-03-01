import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

export const canActivateGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  => {
    const authService = inject(AuthService); 
    const router = inject(Router);
    return authService.isAuthenticated().then((authenticated) => {
      if (authenticated) {
        return true;
      } else {
        router.navigate(['/']);
      }
    });
  };
   
  export const canActivateChildGuard: CanActivateChildFn = canActivateGuard;
  