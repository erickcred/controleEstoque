import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: []
})
export class ToolbarNavigationComponent {

  topSidBarMenuPrincipal: boolean = false;

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
}
