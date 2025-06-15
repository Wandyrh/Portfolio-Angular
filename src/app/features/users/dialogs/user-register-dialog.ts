import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserDto } from '../dtos/create-user.dto';

@Component({
  selector: 'app-user-register-dialog',
  templateUrl: './user-register-dialog.html',
  styleUrls: ['./user-register-dialog.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserRegisterDialog {
  form: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<UserRegisterDialog, CreateUserDto>,
    @Inject(MAT_DIALOG_DATA) public data: CreateUserDto,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAccept(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.dialogRef.close(this.form.value as CreateUserDto);
    }
  }
}