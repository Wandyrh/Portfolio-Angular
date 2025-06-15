import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './services/users.service';
import { UserDto } from './dtos/user.dto';
import { PagedResult } from '../../shared/dtos/paged-result.dto';
import { UserRegisterDialog } from './dialogs/user-register-dialog';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
  providers: [UsersService]
})
export class Users implements OnInit {
  pagedResult: PagedResult<UserDto> = {
    items: [],
    totalItems: 0,
    page: 1,
    totalPages: 1,
    pageSize: 10
  };
  pageNumbers: number[] = [];
  loading = true;
  error: string | null = null;


  constructor(
    private usersService: UsersService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPage(1);
  }

  onPageSizeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.loadPage(1, Number(value));
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open<UserRegisterDialog, undefined, CreateUserDto>(UserRegisterDialog, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe((result: CreateUserDto | undefined) => {
      if (result) {
        this.usersService.create(result).subscribe({
          next: () => this.loadPage(1)
        });
      }
    });
  }

  loadPage(page: number, pageSize?: number): void {
    this.loading = true;
    this.error = null;
    const size = pageSize ? Number(pageSize) : this.pagedResult.pageSize;
    this.usersService.getPaged({ page, pageSize: size }).subscribe({
      next: res => {
        this.pagedResult = res.data ?? {
          items: [],
          totalItems: 0,
          page: 1,
          totalPages: 10,
          pageSize: size
        };
        this.pageNumbers = Array.from({ length: this.pagedResult.totalPages }, (_, i) => i + 1);
        this.loading = false;
      },
      error: err => {
        this.error = 'Error loading users';
        this.loading = false;
      }
    });
  }

}