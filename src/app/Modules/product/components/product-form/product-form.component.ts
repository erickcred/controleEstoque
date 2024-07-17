import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { ProductEventAction } from 'src/app/Models/Enums/Produducts/ProductEventAction';
import { IGetCategoryResponse } from 'src/app/Models/Interfaces/Categories/Response/IGetCategoryResponse';
import { IGetProductsResponse } from 'src/app/Models/Interfaces/Products/Response/IGetProductsResponse';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { ProductService } from 'src/app/Services/Products/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();

  categories: IGetCategoryResponse[] = [];
  selectedCategory: Array<{id: string, name: string}> = [];
  selectProducty!: IGetProductsResponse;
  productAction!: {
    event: ProductEventAction,
    products: IGetProductsResponse[],
  };

  addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required]
  });

  editProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    amount: [0, Validators.required]
  });


  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    public dynamicRef: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.productAction = this.dynamicRef.data;
    this.loadCategories();
  }

  loadProduct(idProduct: string) {
    const productList = this.productAction?.products
    if (productList.length > 0) {
      const filterProduct = productList.filter(item => item.id == idProduct);

      if (filterProduct) {
        this.selectProducty = filterProduct[0];

        this.editProductForm.setValue({
          name: this.selectProducty?.name,
          price: this.selectProducty?.price,
          description: this.selectProducty?.description,
          amount: this.selectProducty?.amount
        });

      }
    }

    // this.productService.getAllProducts()
    //   .pipe( takeUntil(this.destroy$) )
    //   .subscribe({
    //     next: (response) => {
    //       if (response) {
    //         let selectProduct = response.find(p => p.id == idProduct);

    //         if (selectProduct) {
    //           this.editProductForm.setValue({
    //             product_id: selectProduct?.id == null ? '' : selectProduct?.id,
    //             name: selectProduct?.name == null ? '' : selectProduct?.name,
    //             price: selectProduct?.price == null ? '' : selectProduct?.price,
    //             description: selectProduct?.description == null ? '' : selectProduct?.description,
    //             amount: selectProduct?.amount == null ? 0 : selectProduct?.amount
    //           });
    //         }
    //       }
    //     }
    //   });
  }

  loadCategories() {
    this.categoryService.getAllCategories()
      .pipe( takeUntil(this.destroy$) )
      .subscribe({
        next: (response) => {
          if (response) {
            this.categories = response;
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
  }

  submitAddProduct() {
    if (this.addProductForm?.value && this.addProductForm.valid) {
      let data = this.addProductForm.value;
      data.price = data.price?.toString();

      this.productService.addProduct(this.addProductForm.value as any)
        .pipe( takeUntil(this.destroy$) )
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Produto ${response.name} adicionado!`,
                life: 3000
              });
              this.router.navigate(['/products']);
            }
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error?.error,
              life: 5000,
            });
          }
        });
        this.addProductForm.reset();
    }
  }

  submitUpdateProduct() {
    this.loadProduct('fabc4812-20be-4e34-b5f8-3619d4037645');

    if (this.editProductForm?.value && this.editProductForm.valid) {
      let data = this.editProductForm.value;
      data.price = data.price?.toString();

      this.productService.updateProduct(this.editProductForm.value as any)
        .pipe( takeUntil(this.destroy$) )
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Produto ${response.name} alterado!`,
                life: 3000
              });
              this.router.navigate(['/products']);
            }
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error?.error,
              life: 5000,
            });
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
