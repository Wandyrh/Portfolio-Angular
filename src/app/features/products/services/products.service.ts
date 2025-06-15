import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ProductDto } from '../dtos/product.dto';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ApiResult } from '../../../shared/dtos/api-result.dto';
import { PagedResult } from '../../../shared/dtos/paged-result.dto';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly apiUrl = environment.apiUrl + '/Products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResult<ProductDto[]>> {
    return this.http.get<ApiResult<ProductDto[]>>(this.apiUrl);
  }

  getPaged(params?: any): Observable<ApiResult<PagedResult<ProductDto>>> {
    return this.http.get<ApiResult<PagedResult<ProductDto>>>(`${this.apiUrl}/paged`, { params });
  }

  getById(id: string): Observable<ApiResult<ProductDto>> {
    return this.http.get<ApiResult<ProductDto>>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateProductDto): Observable<ApiResult<ProductDto>> {
    return this.http.post<ApiResult<ProductDto>>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductDto): Observable<ApiResult<ProductDto>> {
    return this.http.put<ApiResult<ProductDto>>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string): Observable<ApiResult<void>> {
    return this.http.delete<ApiResult<void>>(`${this.apiUrl}/${id}`);
  }
}