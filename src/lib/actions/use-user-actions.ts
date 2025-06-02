import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, UserRole } from "../hooks/use-fetch-users";
import { api } from "../services/api";

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  profileImage?: string;
  departmentId: string;
  workScheduleId: string;
  companyId: string;
}

interface UpdateUserParams
  extends Omit<CreateUserParams, "companyId" | "password"> {
  id: string;
  password?: string;
}

export function useUserActions() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (params: CreateUserParams) => {
      const response = await api.post<User>("/users", params);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (params: UpdateUserParams) => {
      const response = await api.put<User>(`/users/${params.id}`, params);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    createMutation,
    updateMutation,
  };
}
