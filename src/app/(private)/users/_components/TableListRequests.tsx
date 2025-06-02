"use client";

import { useFetchUsers } from "@/lib/hooks/use-fetch-users";
import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DataTable } from "../../../../components/table/data-table";
import { columns } from "./columns";

export function TableListRequests() {
  const router = useRouter();
  const {
    data: fetchUsers,
    refetch,
    isLoading,
  } = useFetchUsers({
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
      data={fetchUsers?.data ?? []}
      total={fetchUsers?.total ?? 0}
      pagination={pagination}
      setPagination={setPagination}
      onClickRow={(row) => router.push(`/users/${row.id}`)}
      onReload={refetch}
      isLoading={isLoading}
      disableSearch
      onAdd={() => {
        router.push("/users/create");
      }}
    />
  );
}
