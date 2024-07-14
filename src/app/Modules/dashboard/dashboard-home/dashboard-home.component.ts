import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { IGetProductsResponse } from 'src/app/Models/Interfaces/Products/Response/IGetProductsResponse';
import { ProductService } from 'src/app/Services/Products/product.service';
import { ProductDataTransferService } from 'src/app/Shared/services/produtcts/product-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  productsCharts!: any;
  productsChartsOptions: any;
  productList!: IGetProductsResponse[];

  constructor(
    private messageService: MessageService,
    private productService: ProductService,
    private productDtTransferService: ProductDataTransferService
  ) {}

  ngOnInit(): void {
    this.loadItemsCarts();
  }

  loadItemsCarts() {
    this.productService.getAllProducts()
    .pipe( takeUntil(this.destroy$) )
    .subscribe({
      next: (response: IGetProductsResponse[]) => {
        if (response.length > 0) {
          this.productList = response;
          this.productDtTransferService.setProductsData(response);
          this.setProductCharts();
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
    });
  }

  setProductCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.productsCharts = {
      labels: this.productList.map(p => p.name),
      datasets: [
        {
          label: 'Quantidade',
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          hoverBackgroundColor: [
            'rgb(255, 159, 64, 0.7)',
            'rgb(75, 192, 192, 0.7)',
            'rgb(54, 162, 235, 0.7)',
            'rgb(153, 102, 255, 0.7)',
          ],
          data: this.productList.map(p => p.amount),
          borderWidth: 1,
        },
      ],
    };

    this.productsChartsOptions = {
      maintainAspctRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
            font: { weight: '600'}
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
            font: { weight: '600'}
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
