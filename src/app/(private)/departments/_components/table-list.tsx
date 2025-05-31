"use client";

import { useFetchDepartments } from "@/lib/hooks/use-fetch-departments";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "../../../../components/table/data-table";
import { columns } from "./columns";
import { DepartmentForm } from "./department-form";

export function TableListDepartments() {
  const {
    data: fetchDepartments,
    refetch,
    isLoading,
  } = useFetchDepartments({
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
          fetchDepartments?.data?.map((item) => ({
            id: item.id,
            name: item.name,
          })) ?? []
        }
        total={fetchDepartments?.total ?? 0}
        pagination={pagination}
        setPagination={setPagination}
        isLoading={isLoading}
        disableSearch
        onReload={refetch}
        onAdd={() => {
          setIsCreateOpen(true);
        }}
      />

      <DepartmentForm
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
}
