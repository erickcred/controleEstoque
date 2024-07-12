import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { IGetProductsResponse } from 'src/app/Models/Interfaces/Products/Response/IGetProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProdutctDataTransferService {

  public productsDateEmitter$ = new BehaviorSubject<IGetProductsResponse[] | null>(null);
  public productsData: Array<IGetProductsResponse> = []

  constructor() { }

  setProductsData(product: IGetProductsResponse[]): void {
    if (product) {
      this.productsDateEmitter$.next(product)
      this.getProductsData();
    }
  }

  getProductsData() {
    this.productsDateEmitter$
      .pipe(
        take(1),
        map(product => product?.filter(p => p.amount > 0))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.productsData = response;
          }
        }
      });
      return this.productsData;
  }
}
