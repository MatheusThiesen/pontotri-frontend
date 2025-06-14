"use client";

import { Badge } from "@/components/ui/badge";

import {
  User,
  USER_ROLE_COLORS,
  USER_ROLE_LABELS,
  UserRole,
} from "@/lib/hooks/use-fetch-users";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Building, Calendar, Clock, Mail } from "lucide-react";

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
        <Badge variant="outline" className={USER_ROLE_COLORS[role]}>
          {USER_ROLE_LABELS[role]}
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
