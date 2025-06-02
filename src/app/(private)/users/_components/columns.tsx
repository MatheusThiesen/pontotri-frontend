"use client";

import { Badge } from "@/components/ui/badge";
import { User, UserRole } from "@/lib/hooks/use-fetch-users";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Building, Calendar, Clock, Mail } from "lucide-react";

const getRoleLabel = (role: UserRole): string => {
  const labels: Record<UserRole, string> = {
    [UserRole.EMPLOYEE]: "Colaborador",
    [UserRole.ADMIN]: "Administrador",
    [UserRole.OWNER]: "Proprietário",
    [UserRole.MANAGER]: "Gerente",
  };
  return labels[role];
};

const getRoleColor = (role: UserRole): string => {
  const colors: Record<UserRole, string> = {
    [UserRole.EMPLOYEE]: "bg-blue-50 text-blue-700 border-blue-200",
    [UserRole.ADMIN]: "bg-purple-50 text-purple-700 border-purple-200",
    [UserRole.MANAGER]: "bg-teal-50 text-teal-700 border-teal-200",
    [UserRole.OWNER]: "bg-amber-50 text-amber-700 border-amber-200",
  };
  return colors[role];
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="font-medium text-primary">{row.getValue("name")}</div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-3.5 w-3.5" />
          <span>{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Função",
    cell: ({ row }) => {
      const role = row.getValue("role") as UserRole;
      return (
        <Badge variant="outline" className={getRoleColor(role)}>
          {getRoleLabel(role)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "department",
    header: "Departamento",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Building className="h-3.5 w-3.5" />
        <span>{row.original.department?.name ?? "Sem vinculo"}</span>
      </div>
    ),
  },
  {
    accessorKey: "workSchedule",
    header: "Jornada",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        <span>{row.original.workSchedule?.name ?? "Sem vinculo"}</span>
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={
          row.getValue("isActive")
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-red-50 text-red-700 border-red-200"
        }
      >
        {row.getValue("isActive") ? "Ativo" : "Inativo"}
      </Badge>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Atualizado em",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date;
      return (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{format(new Date(date), "dd/MM/yyyy")}</span>
        </div>
      );
    },
  },
];
