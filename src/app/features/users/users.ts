import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './services/users.service';
import { UserDto } from './dtos/user.dto';
import { PagedResult } from '../../shared/dtos/paged-result.dto';
import { UserDialog } from './dialogs/user-dialog';
import { FormOperation } from '../../shared/enums/form-operation';
import { QuestionDialog } from '../../shared/components/question-dialog/question-dialog';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
  providers: [UsersService],
})
export class Users implements OnInit {
  pagedResult: PagedResult<UserDto> = {
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
    private usersService: UsersService,
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
    const dialogRef = this.dialog.open<
      UserDialog,
      { user: any; operation: number },
      CreateUserDto
    >(UserDialog, {
      width: '400px',
      data: { user: {}, operation: FormOperation.Create },
    });
    dialogRef.afterClosed().subscribe((result: CreateUserDto | undefined) => {
      if (result) {
        this.usersService.create(result).subscribe({
          next: () => {
            this.loadPage(1);
            this.snackBar.open('Nuevo usuario creado con éxito', '✕', {
              duration: 3000,
              verticalPosition: 'bottom',
              panelClass: ['snackbar-success'],
            });
          },
        });
      }
    });
  }

  deleteUser(user: UserDto): void {
    const dialogRef = this.dialog.open(QuestionDialog, {
      width: '450px',
      data: {
        title: 'Delete User',
        question: 'Are you sure you want to delete this user?',
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean | undefined) => {
      if (confirmed) {
        this.usersService.delete(user.id).subscribe({
          next: () => {
            this.loadPage(this.pagedResult.page);
            this.snackBar.open('Usuario eliminado', '✕', {
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
    this.usersService.getPaged({ page, pageSize: size }).subscribe({
      next: (res) => {
        this.pagedResult = res.data ?? {
          items: [],
          totalItems: 0,
          page: 1,
          totalPages: 5,
          pageSize: size,
        };
        this.pageNumbers = Array.from(
          { length: this.pagedResult.totalPages },
          (_, i) => i + 1
        );
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading users';
        this.loading = false;
      },
    });
  }

  editUser(user: UserDto): void {
    const dialogRef = this.dialog.open<
      UserDialog,
      { user: UserDto; operation: number },
      UserDto
    >(UserDialog, {
      width: '400px',
      data: { user: user, operation: FormOperation.Update },
    });
    dialogRef.afterClosed().subscribe((result: UserDto | undefined) => {
      if (result) {
        result.id = user.id;
        this.usersService
          .update(user.id, result)
          .subscribe(() => this.loadPage(this.pagedResult.page));
      }
    });
  }
}
