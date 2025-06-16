import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserDto } from '../dtos/user.dto';
import { FormOperation } from '../../../shared/enums/form-operation';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.html',
  styleUrls: ['./user-dialog.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserDialog {
  form: FormGroup;
  submitted = false;
  operation: FormOperation;
  isCreateOperation: boolean = false;
  isUpdateOperation: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UserDialog, UserDto>,
    @Inject(MAT_DIALOG_DATA)
    public data: { user: UserDto; operation: FormOperation },
    private fb: FormBuilder
  ) {
    this.operation = data.operation;
    this.isCreateOperation = this.operation === FormOperation.Create;
    this.isUpdateOperation = this.operation === FormOperation.Update;
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      ...(this.operation === FormOperation.Create
        ? { password: ['', Validators.required] }
        : {}),
    });

    if (data.user) {
      this.form.patchValue(data.user);
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
