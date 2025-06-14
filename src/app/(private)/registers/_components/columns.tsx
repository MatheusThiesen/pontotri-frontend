"use client";

import { Badge } from "@/components/ui/badge";
import {
  TIME_RECORD_TYPE_COLORS,
  TIME_RECORD_TYPE_LABELS,
  TimeRecord,
  TimeRecordType,
} from "@/lib/hooks/use-fetch-records";
import { ColumnDef } from "@tanstack/react-table";
import { Clock, MapPin, User } from "lucide-react";

export const columns: ColumnDef<TimeRecord>[] = [
  {
    accessorKey: "createdAtToFormat",
    header: "Data/Hora",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
        <span>{row.original.createdAtToFormat}</span>
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: "Colaborador",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <User className="h-3.5 w-3.5 text-muted-foreground" />
        <div className="flex flex-col">
          <span className="font-medium">{row.original.user?.name ?? "-"}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.user?.email ?? "-"}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.getValue("type") as TimeRecordType;
      return (
        <Badge variant="outline" className={TIME_RECORD_TYPE_COLORS[type]}>
          {TIME_RECORD_TYPE_LABELS[type]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "locationId",
    header: "Local",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        <span>{row.original.location.description ?? "Não registrado"}</span>
      </div>
    ),
  },
];
