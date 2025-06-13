import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { LoginDto } from '.././dtos/login.dto';
import { LoginUserResponseDTO } from '../dtos/login-user-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(dto: LoginDto): Observable<LoginUserResponseDTO> {
    return this.http.post<LoginUserResponseDTO>(`${this.apiUrl}/Authentication/login`, dto);
  }
}