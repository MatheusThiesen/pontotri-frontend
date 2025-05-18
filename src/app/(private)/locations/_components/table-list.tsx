"use client";

import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DataTable } from "../../../../components/table/data-table";
import { columns } from "./columns";
import { LocationForm } from "./location-form";

export function TableListLocations() {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleCreateSuccess = () => {
    setIsCreateOpen(false);
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={[
          {
            id: "1",
            description: "Localização 1",
            latitude: 12.34,
            longitude: 56.78,
          },
        ]}
        total={0}
        pagination={pagination}
        setPagination={setPagination}
        onAdd={() => {
          setIsCreateOpen(true);
        }}
        onReload={() => {}}
      />

      <LocationForm
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
}
