import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from './services/products.service';
import { ProductDto } from './dtos/product.dto';
import { PagedResult } from '../../shared/dtos/paged-result.dto';
import { ProductDialog } from './dialogs/product-dialog';
import { FormOperation } from '../../shared/enums/form-operation';
import { QuestionDialog } from '../../shared/components/question-dialog/question-dialog';

import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './products.html',
  styleUrls: ['./products.scss'],
  providers: [ProductsService],
})
export class Products implements OnInit {
  pagedResult: PagedResult<ProductDto> = {
    items: [],
    totalItems: 0,
    page: 1,
    totalPages: 1,
    pageSize: 5,
  };
  pageNumbers: number[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadPage(1);
  }

  onPageSizeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.loadPage(1, Number(value));
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open<ProductDialog, { product: any; operation: number }, ProductDto>(
      ProductDialog,
      {
        width: '400px',
        data: { product: {}, operation: FormOperation.Create },
      }
    );
    dialogRef.afterClosed().subscribe((result: ProductDto | undefined) => {
      if (result) {
        this.productsService.create(result).subscribe({
          next: () => {
            this.loadPage(1);
            this.snackBar.open(this.translate.instant('PRODUCTS.ALERT_CREATED'), '✕', {
              duration: 3000,
              verticalPosition: 'bottom',
              panelClass: ['snackbar-success'],
            });
          },
        });
      }
    });
  }

  deleteProduct(product: ProductDto): void {
    const dialogRef = this.dialog.open(QuestionDialog, {
      width: '450px',
      data: {
        title: this.translate.instant('PRODUCTS.DELETE_TITLE'),
        question: this.translate.instant('PRODUCTS.DELETE_QUESTION'),
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean | undefined) => {
      if (confirmed) {
        this.productsService.delete(product.id).subscribe({
          next: () => {
            this.loadPage(this.pagedResult.page);
            this.snackBar.open(this.translate.instant('PRODUCTS.ALERT_DELETED'), '✕', {
              duration: 3000,
              verticalPosition: 'bottom',
              panelClass: ['snackbar-success'],
            });
          },
        });
      }
    });
  }

  loadPage(page: number, pageSize?: number): void {
    this.loading = true;
    this.error = null;
    const size = pageSize ? Number(pageSize) : this.pagedResult.pageSize;
    this.productsService.getPaged({ page, pageSize: size }).subscribe({
      next: (res) => {
        this.pagedResult = res.data ?? {
          items: [],
          totalItems: 0,
          page: 1,
          totalPages: 1,
          pageSize: size,
        };
        this.pageNumbers = Array.from(
          { length: this.pagedResult.totalPages },
          (_, i) => i + 1
        );
        this.loading = false;
      },
      error: () => {
        this.error = this.translate.instant('PRODUCTS.ALERT_ERROR');
        this.loading = false;
      },
    });
  }

  editProduct(product: ProductDto): void {
    const dialogRef = this.dialog.open<ProductDialog, { product: ProductDto; operation: number }, ProductDto>(
      ProductDialog,
      {
        width: '400px',
        data: { product: product, operation: FormOperation.Update },
      }
    );
    dialogRef.afterClosed().subscribe((result: ProductDto | undefined) => {
      if (result) {
        result.id = product.id;
        this.productsService.update(product.id, result).subscribe(() => {
          this.loadPage(this.pagedResult.page);
          this.snackBar.open(this.translate.instant('PRODUCTS.ALERT_UPDATED'), '✕', {
            duration: 3000,
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success'],
          });
        });
      }
    });
  }
}