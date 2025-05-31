import { api } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";

export interface Location {
  id: string;
  description: string;
  latitude: number;
  longitude: number;
}

const fetchLocations = async ({
  page,
  pagesize,
}: PaginationRequest): Promise<PaginatedResponse<Location>> => {
  const { data } = await api.get("/locations", {
    params: { page, pagesize },
  });

  return data;
};

export const useFetchLocations = ({ page, pagesize }: PaginationRequest) => {
  return useQuery({
    queryKey: ["locations", page, pagesize],
    queryFn: () => fetchLocations({ page, pagesize }),
  });
};
