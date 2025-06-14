"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Building } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { DepartmentActions } from "./department-actions";

export const dataSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Client = z.infer<typeof dataSchema>;

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Building className="h-3.5 w-3.5" />
        <span>{row.original.name}</span>
      </div>
    ),
  },

  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const department = row.original;
      return (
        <DepartmentActions
          department={department}
          onSuccess={() => {
            toast.success("Ação realizada com sucesso");
          }}
        />
      );
    },
  },
];
