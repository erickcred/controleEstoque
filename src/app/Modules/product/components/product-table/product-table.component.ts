import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductEventAction } from 'src/app/Models/Enums/Produducts/ProductEventAction';
import { IProductEventAction } from 'src/app/Models/Interfaces/Event/IProductEventAction';
import { IProductEventDeleteAction } from 'src/app/Models/Interfaces/Event/IProductEventDeleteAction';
import { IGetProductsResponse } from 'src/app/Models/Interfaces/Products/Response/IGetProductsResponse';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  @Input() products: IGetProductsResponse[] = [];
  @Output() eventProductAction: EventEmitter<IProductEventAction> = new EventEmitter();
  @Output() deleteProductAction: EventEmitter<IProductEventDeleteAction> = new EventEmitter();

  add = ProductEventAction.add;
  edit = ProductEventAction.edit;

  productSelected!: IGetProductsResponse;
  valorTotal: any;

  constructor() { }

  ngOnInit(): void {

  }

  productEvent(action: string, id?: string) {
    if (action && action !== '') {
      const productData = id && id != '' ? { action, id } : { action };
      this.eventProductAction.emit(productData);
    }
  }

  deleteProduct(productId: string, productName: string) {
    if (productId !== '' && productName !== '')
      this.deleteProductAction.emit({ productId, productName})
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
}
