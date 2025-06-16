import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { LoginDto } from '.././dtos/login.dto';
import { LoginUserResponseDTO } from '../dtos/login-user-response.dto';
import { ApiResult } from '../../../shared/dtos/api-result.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(dto: LoginDto): Observable<ApiResult<LoginUserResponseDTO>> {
    return this.http.post<ApiResult<LoginUserResponseDTO>>(`${this.apiUrl}/Authentication/login`, dto);
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}