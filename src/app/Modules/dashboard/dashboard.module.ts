import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { ChartModule } from 'primeng/chart';

import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // PrimeNG
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    SidebarModule,
    ToolbarModule,
    MenubarModule,
    ChartModule,
  ],
  providers: [
    MessageService,
    CookieService,
  ]
})
export class DashboardModule { }
