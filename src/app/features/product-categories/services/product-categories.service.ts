import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ProductCategoryDto } from '../dtos/product-category.dto';
import { CreateProductCategoryDto } from '../dtos/create-product-category.dto';
import { UpdateProductCategoryDto } from '../dtos/update-product-category.dto';
import { ApiResult } from '../../../shared/dtos/api-result.dto';
import { PagedResult } from '../../../shared/dtos/paged-result.dto';

@Injectable({ providedIn: 'root' })
export class ProductCategoriesService {
  private readonly apiUrl = environment.apiUrl + '/ProductCategories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResult<ProductCategoryDto[]>> {
    return this.http.get<ApiResult<ProductCategoryDto[]>>(this.apiUrl);
  }

  getPaged(params?: any): Observable<ApiResult<PagedResult<ProductCategoryDto>>> {
    return this.http.get<ApiResult<PagedResult<ProductCategoryDto>>>(`${this.apiUrl}/paged`, { params });
  }

  getById(id: string): Observable<ApiResult<ProductCategoryDto>> {
    return this.http.get<ApiResult<ProductCategoryDto>>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateProductCategoryDto): Observable<ApiResult<ProductCategoryDto>> {
    return this.http.post<ApiResult<ProductCategoryDto>>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductCategoryDto): Observable<ApiResult<ProductCategoryDto>> {
    return this.http.put<ApiResult<ProductCategoryDto>>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string): Observable<ApiResult<void>> {
    return this.http.delete<ApiResult<void>>(`${this.apiUrl}/${id}`);
  }
}