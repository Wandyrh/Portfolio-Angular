import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCategoriesService } from './services/product-categories.service';
import { ProductCategoryDto } from './dtos/product-category.dto';
import { CreateProductCategoryDto } from './dtos/create-product-category.dto';
import { UpdateProductCategoryDto } from './dtos/update-product-category.dto';
import { PagedResult } from '../../shared/dtos/paged-result.dto';
import { ProductCategoryDialog } from './dialogs/product-category-dialog';
import { FormOperation } from '../../shared/enums/form-operation';
import { QuestionDialog } from '../../shared/components/question-dialog/question-dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
 
@Component({
  selector: 'app-product-categories',
  standalone: true,
  templateUrl: './product-categories.html',
  styleUrls: ['./product-categories.scss'],
  imports: [TranslateModule],
  providers: [ProductCategoriesService]
})
export class ProductCategories implements OnInit {
  pagedResult: PagedResult<ProductCategoryDto> = {
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
    private categoriesService: ProductCategoriesService,
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

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open<ProductCategoryDialog, { category: any; operation: number }, CreateProductCategoryDto>(
      ProductCategoryDialog,
      {
        width: '400px',
        data: { category: {}, operation: FormOperation.Create },
      }
    );
    dialogRef.afterClosed().subscribe((result: CreateProductCategoryDto | undefined) => {
      if (result) {
        this.categoriesService.create(result).subscribe({
          next: () => {
            this.loadPage(1);
            this.snackBar.open(this.translate.instant('PRODUCT_CATEGORIES.ALERT_CREATED'), '✕', {
              duration: 3000,
              verticalPosition: 'bottom',
              panelClass: ['snackbar-success']
            });
          },
        });
      }
    });
  }

  editCategory(category: ProductCategoryDto): void {
    const dialogRef = this.dialog.open<ProductCategoryDialog, { category: ProductCategoryDto; operation: number }, UpdateProductCategoryDto>(
      ProductCategoryDialog,
      {
        width: '400px',
        data: { category: category, operation: FormOperation.Update },
      }
    );
    dialogRef.afterClosed().subscribe((result: UpdateProductCategoryDto | undefined) => {
      if (result) {
        result.id = category.id;
        this.categoriesService.update(category.id, result).subscribe(() => {
          this.loadPage(this.pagedResult.page);
          this.snackBar.open(this.translate.instant('PRODUCT_CATEGORIES.ALERT_UPDATED'), '✕', {
            duration: 3000,
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success']
          });
        });
      }
    });
  }

  deleteCategory(category: ProductCategoryDto): void {
    const dialogRef = this.dialog.open(QuestionDialog, {
      width: '400px',
      data: {
        title: this.translate.instant('PRODUCT_CATEGORIES.DELETE_TITLE'),
        question: this.translate.instant('PRODUCT_CATEGORIES.DELETE_QUESTION', { name: category.name }),
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean | undefined) => {
      if (confirmed) {
        this.categoriesService.delete(category.id).subscribe({
          next: () => {
            this.loadPage(this.pagedResult.page);
            this.snackBar.open(this.translate.instant('PRODUCT_CATEGORIES.ALERT_DELETED'), '✕', {
              duration: 3000,
              verticalPosition: 'bottom',
              panelClass: ['snackbar-success']
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
    this.categoriesService.getPaged({ page, pageSize: size }).subscribe({
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
      error: (err) => {
        this.error = this.translate.instant('PRODUCT_CATEGORIES.ALERT_ERROR');
        this.loading = false;
      },
    });
  }
}