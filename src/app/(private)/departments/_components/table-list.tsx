"use client";

import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DataTable } from "../../../../components/table/data-table";
import { columns } from "./columns";
import { DepartmentForm } from "./department-form";

export function TableListDepartments() {
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
            name: "RH",
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

      <DepartmentForm
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
}
