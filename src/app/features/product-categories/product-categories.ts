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

@Component({
  selector: 'app-product-categories',
  standalone: true,
  templateUrl: './product-categories.html',
  styleUrls: ['./product-categories.scss'],
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
    private snackBar: MatSnackBar
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
            this.snackBar.open('New category created successfully', '✕', {
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
          this.snackBar.open('Category updated', '✕', {
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
        title: 'Delete Category',
        question: `Are you sure you want to delete the category "${category.name}"?`,
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean | undefined) => {
      if (confirmed) {
        this.categoriesService.delete(category.id).subscribe({
          next: () => {
            this.loadPage(this.pagedResult.page);
            this.snackBar.open('Category deleted', '✕', {
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
        this.error = 'Error loading categories';
        this.loading = false;
      },
    });
  }
}