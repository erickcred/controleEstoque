import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();

  topSidBarMenuPrincipal: boolean = false;

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
}
