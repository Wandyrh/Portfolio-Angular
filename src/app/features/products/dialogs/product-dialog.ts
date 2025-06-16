import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductDto } from '../dtos/product.dto';
import { FormOperation } from '../../../shared/enums/form-operation';
import { ProductCategoriesService } from '../../product-categories/services/product-categories.service';
import { ProductCategoryDto } from '../../product-categories/dtos/product-category.dto';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.html',
  styleUrls: ['./product-dialog.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  providers: [ProductCategoriesService],
})
export class ProductDialog implements OnInit {
  form: FormGroup;
  submitted = false;
  operation: FormOperation;
  isCreateOperation: boolean = false;
  isUpdateOperation: boolean = false;
  categories: ProductCategoryDto[] = [];
  loadingCategories = true;

  constructor(
    public dialogRef: MatDialogRef<ProductDialog, ProductDto>,
    @Inject(MAT_DIALOG_DATA)
    public data: { product: ProductDto; operation: FormOperation },
    private fb: FormBuilder,
    private categoriesService: ProductCategoriesService
  ) {
    this.operation = data.operation;
    this.isCreateOperation = this.operation === FormOperation.Create;
    this.isUpdateOperation = this.operation === FormOperation.Update;
    this.form = this.fb.group({
      categoryId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    if (data.product) {
      this.form.patchValue(data.product);
    }
  }

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe({
      next: (res) => {
        this.categories = res.data ?? [];
        this.loadingCategories = false;
      },
      error: () => {
        this.loadingCategories = false;
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAccept(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}