import { api } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";

export interface Department {
  id: string;
  name: string;
}

const fetchDepartments = async ({
  page,
  pagesize,
}: PaginationRequest): Promise<PaginatedResponse<Department>> => {
  const { data } = await api.get("/departments", {
    params: { page, pagesize },
  });

  return data;
};

export const useFetchDepartments = ({ page, pagesize }: PaginationRequest) => {
  return useQuery({
    queryKey: ["departments", page, pagesize],
    queryFn: () => fetchDepartments({ page, pagesize }),
  });
};
