"use client";

import { ColumnDef } from "@tanstack/react-table";
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
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("name")}</div>,
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
