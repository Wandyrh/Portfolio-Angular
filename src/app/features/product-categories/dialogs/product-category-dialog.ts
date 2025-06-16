import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategoryDto } from '../dtos/product-category.dto';
import { FormOperation } from '../../../shared/enums/form-operation';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-category-dialog',
  templateUrl: './product-category-dialog.html',
  styleUrls: ['./product-category-dialog.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class ProductCategoryDialog {
  form: FormGroup;
  submitted = false;
  operation: FormOperation;
  isCreateOperation: boolean = false;
  isUpdateOperation: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ProductCategoryDialog, ProductCategoryDto>,
    @Inject(MAT_DIALOG_DATA) public data: { category: ProductCategoryDto, operation: FormOperation },
    private fb: FormBuilder
  ) {
    this.operation = data.operation;
    this.isCreateOperation = this.operation === FormOperation.Create;
    this.isUpdateOperation = this.operation === FormOperation.Update;
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    if (data.category) {
      this.form.patchValue(data.category);
    }
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