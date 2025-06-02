export type TPagination<T> = {
  page: number;
  limit: number;
  total: number;
  data: T[];
}

export type TPaginateParameters = {
  page?: number;
  limit?: number;
}
