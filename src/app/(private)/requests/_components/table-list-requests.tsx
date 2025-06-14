"use client";

import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DataTable } from "../../../../components/table/data-table";
import { columns } from "./columns";

export function TableListRequests() {
  const router = useRouter();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <DataTable
      columns={columns}
      data={[]}
      total={0}
      pagination={pagination}
      setPagination={setPagination}
      onReload={() => {}}
      onAdd={() => {
        router.push("/requests/create");
      }}
      isLoading={false}
    />
  );
}
