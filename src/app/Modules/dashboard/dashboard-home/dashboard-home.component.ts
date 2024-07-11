import { Component, OnDestroy, OnInit } from '@angular/core';
// import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();

  topSidBarMenuPrincipal: boolean = false;
  items: MenuItem[] | undefined

  constructor() {
    this.items = [
      {
          label: 'Home',
          icon: 'pi pi-home'
      },
      {
          label: 'Features',
          icon: 'pi pi-star'
      },
      {
          label: 'Projects',
          icon: 'pi pi-search'
      },
      {
          label: 'Contact',
          icon: 'pi pi-envelope'
      }
  ]
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

export interface MenuItem {
  label: string;
  icon: string
}
