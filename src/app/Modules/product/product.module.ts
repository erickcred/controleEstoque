import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from 'src/app/Shared/shared.module';
import { TagModule } from 'primeng/tag';

import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ToastModule } from 'primeng/toast';
import { ProductFormComponent } from './components/product-form/product-form.component';

@NgModule({
  declarations: [
    ProductHomeComponent,
    ProductTableComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // PrimeNG
    CardModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,
    TagModule,
    ToastModule,

    // Shared
    SharedModule,
  ],
  providers: [
    MessageService,
    CookieService,
    DialogService,
    ConfirmationService,
  ]
})
export class ProductModule { }
