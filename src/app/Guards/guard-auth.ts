import { Injectable } from '@angular/core';
import { UserService } from '../Services/User/user.service';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardAuth {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.isLoggedIn() === false) {
      this.router.navigate(['/login'])
      return false;
    }
    this.userService.isLoggedIn();
    return true;
  }
}
