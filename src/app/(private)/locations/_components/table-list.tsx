"use client";

import { useFetchLocations } from "@/lib/hooks/use-fetch-locations";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "../../../../components/table/data-table";
import { columns } from "./columns";
import { LocationForm } from "./location-form";

export function TableListLocations() {
  const { data: fetchLocations, refetch } = useFetchLocations({
    page: 1,
    pagesize: 10,
  });
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
        data={
          fetchLocations?.data.map((item) => ({
            id: item.id,
            description: item.description,
            latitude: item.latitude,
            longitude: item.longitude,
          })) ?? []
        }
        total={fetchLocations?.total ?? 0}
        pagination={pagination}
        setPagination={setPagination}
        onReload={refetch}
        disableSearch
        onAdd={() => {
          setIsCreateOpen(true);
        }}
      />

      <LocationForm
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
}
