import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDisableGuard implements CanActivate {

  constructor(private authService: AuthentificationService,private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isLoggedIn() && sessionStorage.getItem("token")) {
        const user = this.authService.getUserRolesToken(sessionStorage.getItem("token"))
        if(user.chefProjet){
        localStorage.clear()
        this.router.navigate(['liste-projet']);
        }else{
          localStorage.clear()
          this.router.navigate(['liste-projet-membre']);
        }
        return false;
      }
      return true; 
  }
  
}
