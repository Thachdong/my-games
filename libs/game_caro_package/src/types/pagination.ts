export type TPagination<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T[];
};

export type TPaginateParameters = {
  page?: number;
  limit?: number;
};
