import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Department } from "./use-fetch-departments";
import { WorkSchedule } from "./use-fetch-work-schedules";

export enum UserRole {
  ADMIN = "ADMIN",
  OWNER = "OWNER",
  MANAGER = "MANAGER",
  EMPLOYEE = "EMPLOYEE",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  profileImage?: string;
  departmentId: string;
  workScheduleId: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;

  department?: Department;
  workSchedule?: WorkSchedule;
}

interface FetchUsersParams {
  page: number;
  pagesize: number;
}

interface FetchUsersResponse {
  data: User[];
  total: number;
}

export function useFetchUsers({ page, pagesize }: FetchUsersParams) {
  return useQuery({
    queryKey: ["users", page, pagesize],
    queryFn: async () => {
      const response = await api.get<FetchUsersResponse>("/users", {
        params: {
          page,
          pagesize,
        },
      });
      return response.data;
    },
  });
}

export function useFetchUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const response = await api.get<User>(`/users/${id}`);
      return response.data;
    },
  });
}
