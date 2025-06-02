import { z } from "zod";
import { UserRole } from "../hooks/use-fetch-users";

const baseUserSchema = {
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  role: z.nativeEnum(UserRole),
  isActive: z.boolean(),
  profileImage: z.string().optional(),
  departmentId: z.string().min(1, "Departamento é obrigatório"),
  workScheduleId: z.string().min(1, "Jornada de trabalho é obrigatória"),
};

export const createUserSchema = z.object({
  ...baseUserSchema,
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const updateUserSchema = z.object({
  ...baseUserSchema,
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .optional(),
});

export type UserFormValues = z.infer<typeof updateUserSchema>;
