export class ApiResult<T> {
  success!: boolean;
  message?: string;
  data?: T;
}