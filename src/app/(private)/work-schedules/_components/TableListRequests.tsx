"use client";

import { useFetchWorkSchedules } from "@/lib/hooks/use-fetch-work-schedules";
import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DataTable } from "../../../../components/table/data-table";
import { columns } from "./columns";

export function TableListRequests() {
  const router = useRouter();
  const {
    data: fetchLocations,
    refetch,
    isLoading,
  } = useFetchWorkSchedules({
    page: 1,
    pagesize: 10,
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <DataTable
      columns={columns}
      data={fetchLocations?.data ?? []}
      total={fetchLocations?.total ?? 0}
      pagination={pagination}
      setPagination={setPagination}
      onClickRow={(row) => router.push(`/work-schedules/${row.id}`)}
      onReload={refetch}
      isLoading={isLoading}
      disableSearch
      onAdd={() => {
        router.push("/work-schedules/create");
      }}
    />
  );
}
