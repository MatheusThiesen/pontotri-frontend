"use client";

import { useAuth } from "@/lib/contexts/AuthProvider";
import { useFetchRecords } from "@/lib/hooks/use-fetch-records";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "../../../../components/table/data-table";
import { columns } from "./columns";

export function TableListRecords() {
  const { me } = useAuth();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: fetchRecords,
    refetch,
    isLoading,
  } = useFetchRecords({
    page: pagination.pageIndex + 1,
    pagesize: pagination.pageSize,
  });

  return (
    <DataTable
      columns={columns.filter((f) =>
        me.role === "EMPLOYEE" ? f.header !== "Colaborador" : true
      )}
      data={fetchRecords?.data ?? []}
      total={fetchRecords?.total ?? 0}
      pagination={pagination}
      setPagination={setPagination}
      onReload={refetch}
      isLoading={isLoading}
      disableSearch
    />
  );
}
