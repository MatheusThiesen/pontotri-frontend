type PaginationRequest = {
  page: number;
  pagesize: number;
};

type PaginationResponse = {
  total: number;
  page: number;
  pagesize: number;
};

type PaginatedResponse<T> = {
  data: T[];
} & PaginationResponse;
