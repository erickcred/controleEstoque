import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
