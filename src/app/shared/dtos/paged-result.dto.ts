export interface PagedResult<T> {
  items: T[];
  totalItems: number;
  page: number;
  totalPages: number;
  pageSize: number;
}