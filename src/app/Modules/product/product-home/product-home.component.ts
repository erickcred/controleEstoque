import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { IProductEventAction } from 'src/app/Models/Interfaces/Event/IProductEventAction';
import { IProductEventDeleteAction } from 'src/app/Models/Interfaces/Event/IProductEventDeleteAction';
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
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData() {
    const productsLoad = this.productDtTransferService.getProductsData();

    if (productsLoad.length <= 0) {
      this.loadProducts();
    } else
      this.products = productsLoad;
  }

  loadProducts() {
    this.productService.getAllProducts()
    .pipe( takeUntil(this.destroy$) )
    .subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.products = response;
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.error.error,
          life: 5000,
        });
        this.router.navigate(['/dashboard'])
      }
    });
  }

  productEventAction(event: IProductEventAction): void {
    if (event) {
      console.log('Dados recebidos do evento: ', event);
    }
  }

  deleteProductAction(event: IProductEventDeleteAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do produto ${event.productName}`,
        header: `Confirmação de exclusão!`,
        icon: `pi pi-exclamation-triangle`,
        rejectLabel: `Não`,
        rejectButtonStyleClass: `p-button-success font-bolder`,
        acceptLabel: `Sim`,
        acceptButtonStyleClass: 'p-button-outlined p-button-danger',
        accept: () => {
          this.deleteProduct(event?.productId)
        }
      })
    }
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId)
    .pipe( takeUntil(this.destroy$) )
    .subscribe({
      next: (response) => {
        if (response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Seucesso',
            detail: `Produto (${response.name}) removido com sucesso!`,
            life: 4000,
          });
          this.loadProducts();
        }
      },
      error: (error) => {
        console.log(error.error.error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.error.error,
          life: 5000,
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
