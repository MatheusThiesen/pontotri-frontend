"use client";

import { PaginationState } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DataTable } from "../../../../components/table/data-table";
import { columns } from "./columns";

export function TableListRequests() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderby = searchParams.get("orderby");
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const pagesize = searchParams.get("pagesize");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page ? Number(page) : 0,
    pageSize: pagesize ? Number(pagesize) : 10,
  });

  return (
    <DataTable
      columns={columns}
      data={[]}
      total={0}
      pagination={pagination}
      setPagination={setPagination}
      onClickRow={(row) => router.push(`/clientes/${row.id}`)}
      onReload={() => {}}
      orderby={{
        defaultValue: orderby ?? "cod.desc",
        data: [
          { name: "Código (maiores primeiro)", value: "cod.desc" },
          { name: "Código (menores primeiro)", value: "cod.asc" },
          { name: "Nome (A-Z)", value: "company_name.asc" },
          { name: "Nome (Z-A)", value: "company_name.desc" },
          { name: "Criado em (novos primeiro)", value: "created_at.desc" },
          { name: "Criado em (antigos primeiro)", value: "created_at.asc" },
        ],
      }}
      isLoading={false}
    />
  );
}
