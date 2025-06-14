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

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.EMPLOYEE]: "Colaborador",
  [UserRole.ADMIN]: "Administrador",
  [UserRole.OWNER]: "Proprietário",
  [UserRole.MANAGER]: "Gerente",
};

export const USER_ROLE_COLORS: Record<UserRole, string> = {
  [UserRole.EMPLOYEE]: "bg-blue-50 text-blue-700 border-blue-200",
  [UserRole.ADMIN]: "bg-purple-50 text-purple-700 border-purple-200",
  [UserRole.MANAGER]: "bg-teal-50 text-teal-700 border-teal-200",
  [UserRole.OWNER]: "bg-amber-50 text-amber-700 border-amber-200",
};

export const USER_ROLE_OPTIONS = Object.entries(USER_ROLE_LABELS).map(
  ([value, label]) => ({
    value,
    label,
  })
);

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
