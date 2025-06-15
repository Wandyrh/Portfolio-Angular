import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { UserDto } from '../dtos/user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ApiResult } from '../../../shared/dtos/api-result.dto';
import { PagedResult } from '../../../shared/dtos/paged-result.dto';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly apiUrl = environment.apiUrl + '/Users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResult<UserDto[]>> {
    return this.http.get<ApiResult<UserDto[]>>(this.apiUrl);
  }

  getPaged(params?: any): Observable<ApiResult<PagedResult<UserDto>>> {
    return this.http.get<ApiResult<PagedResult<UserDto>>>(`${this.apiUrl}/paged`, { params });
  }

  getById(id: string): Observable<ApiResult<UserDto>> {
    return this.http.get<ApiResult<UserDto>>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateUserDto): Observable<ApiResult<UserDto>> {
    return this.http.post<ApiResult<UserDto>>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateUserDto): Observable<ApiResult<UserDto>> {
    return this.http.put<ApiResult<UserDto>>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string): Observable<ApiResult<void>> {
    return this.http.delete<ApiResult<void>>(`${this.apiUrl}/${id}`);
  }
}