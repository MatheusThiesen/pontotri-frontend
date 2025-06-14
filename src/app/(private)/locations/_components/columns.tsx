"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { LocationActions } from "./location-actions";

export const dataSchema = z.object({
  id: z.string(),
  description: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type Client = z.infer<typeof dataSchema>;

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        <span>{row.original.description}</span>
      </div>
    ),
  },
  {
    accessorKey: "latitude",
    header: "Latitude",
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("latitude")}</div>
    ),
  },
  {
    accessorKey: "longitude",
    header: "Longitude",
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("longitude")}</div>
    ),
  },

  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const location = row.original;
      return (
        <LocationActions
          location={location}
          onSuccess={() => {
            toast.success("Ação realizada com sucesso");
          }}
        />
      );
    },
  },
];
