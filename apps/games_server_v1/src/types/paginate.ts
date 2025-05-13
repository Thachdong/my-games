export interface IPaginate<T> {
  page: number;
  limit: number;
  total: number;
  data: T[];
}