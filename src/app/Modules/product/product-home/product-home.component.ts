import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { IGetProductsResponse } from 'src/app/Models/Interfaces/Products/Response/IGetProductsResponse';
import { ProductService } from 'src/app/Services/Products/product.service';
import { ProductDataTransferService } from 'src/app/Shared/services/produtcts/product-data-transfer.service';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: []
})
export class ProductHomeComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();

  products!: IGetProductsResponse[];

  constructor(
    private productService: ProductService,
    private productDtTransferService: ProductDataTransferService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData() {
    const productsLoad = this.productDtTransferService.getProductsData();

    if (productsLoad.length == 0) {
      this.productService.getAllProducts()
      .pipe( takeUntil(this.destroy$) )
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.products = response;
            this.productDtTransferService.setProductsData(response);
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error.error,
            life: 5000,
          });
        }
      })
    } else
      this.products = productsLoad;
  }

  getSeverity(quantity: number) {
    if (quantity >= 100) {
      return 'success';
    } else if (quantity >= 50 && quantity < 100) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  getStock(quantity: number): string {
    if (quantity >= 200) {
      return 'INSTOCK';
    } else if (quantity >= 50 && quantity < 100) {
      return 'LOWSTOCK';
    } else {
      return 'OUTOFSTOCK';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
