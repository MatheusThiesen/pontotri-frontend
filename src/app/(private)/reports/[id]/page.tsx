"use client";

import { Combobox } from "@/components/form/Combobox";
import {
  DetailGoBack,
  DetailHeader,
  DetailMain,
  DetailPage,
  DetailTitle,
} from "@/components/layouts/detail";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useAuth } from "@/lib/contexts/AuthProvider";
import { fetchReports } from "@/lib/hooks/use-fetch-reports";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { reports } from "../page";

import { TIME_RECORD_TYPE_LABELS } from "@/lib/hooks/use-fetch-records";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

// TODO: Substituir por dados reais da API
const users = [
  { id: "1", name: "João Silva", icon: User },
  { id: "2", name: "Maria Santos", icon: User },
  { id: "3", name: "Pedro Oliveira", icon: User },
  { id: "4", name: "Ana Costa", icon: User },
];

interface ComboboxDataProps {
  value: string;
  label: string;
  icon?: React.ElementType;
}

const userOptions: ComboboxDataProps[] = users.map((user) => ({
  value: user.id,
  label: user.name,
  icon: user.icon,
}));

const reportOptions: ComboboxDataProps[] = reports.map((report) => ({
  value: report.key.toString(),
  label: report.title,
  icon: report.icon,
}));

export default function GenerateReport() {
  const { me } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [date, setDate] = useState<DateRange | undefined>();
  const [selectedUser, setSelectedUser] = useState<ComboboxDataProps | null>(
    null
  );
  const [selectedReport, setSelectedReport] =
    useState<ComboboxDataProps | null>(null);

  const [dataTable, setDataTable] = useState<any[]>([]);
  const [columnsTable, setColumnsTable] = useState<ColumnDef<any>[]>([]);
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    const reportId = params.id as string;
    const report = reportOptions.find((r) => r.value === reportId);
    if (report) {
      setSelectedReport(report);
    }
  }, [params.id]);

  const handleReportChange = (report: ComboboxDataProps | null) => {
    if (report) {
      router.push(`/reports/${report.value}`);
    }
  };

  const handleGenerateReport = async () => {
    if (!date?.from || !date?.to || !selectedReport) return;

    const reports = await fetchReports({
      key: selectedReport.value as any,
      dateStart: date.from,
      dateEnd: date.to,
      userId: selectedUser?.value,
    });

    setReportData(reports);

    let columns: ColumnDef<any>[] = [
      {
        accessorKey: "date",
        header: "DATA",
        cell: ({ row }) => (
          <div
            className={cn(
              "uppercase font-bold ",
              !!row.original?.isWorker ? "text-gray-700" : "text-gray-400"
            )}
          >
            {row.getValue("date")}
          </div>
        ),
      },
      ...reports.reportTimeMirror.recordColumns.map((column) => ({
        accessorKey: column,
        header: TIME_RECORD_TYPE_LABELS[column],
        cell: ({ row }: any) => (
          <div className="uppercase font-bold text-gray-700">
            {row.getValue(column) ?? "-"}
          </div>
        ),
      })),
    ];

    const data = reports.reportTimeMirror.daysWithRecords.map((day) => {
      const records = day.records.map((record) => ({
        [record.type]: dayjs(record.createdAt)
          .locale("pt-br")
          .format("hh:mm A"),
      }));

      const recordData = records.reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {});

      return {
        date: dayjs(day.date).locale("pt-br").format("ddd DD/MM/YYYY"),
        isWorker: day.isWorker,
        ...recordData,
      };
    });

    setColumnsTable(columns);
    setDataTable(data);
  };

  if (!selectedReport) {
    return null;
  }

  const report = reports.find(
    (f) => String(f.key) === String(selectedReport.value)
  );

  return (
    <DetailPage>
      <DetailHeader>
        <DetailGoBack />
        <DetailTitle>Gerar Relatório</DetailTitle>
      </DetailHeader>

      <DetailMain>
        <div className="space-y-6">
          {report && (
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <report.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{report.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {report.description}
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">
                  Configurações do Relatório
                </h3>
                <p className="text-sm text-muted-foreground">
                  Selecione o tipo de relatório, usuário e período
                </p>
              </div>

              <div className="grid gap-4">
                <Combobox
                  label="Tipo de Relatório"
                  data={reportOptions}
                  onChange={handleReportChange}
                  defaultValue={selectedReport.value}
                  className="w-48"
                />

                <div className="flex items-center gap-2">
                  {["ADMIN", "OWNER", "MANAGER"].includes(me.role) && (
                    <Combobox
                      label="Usuário"
                      data={userOptions}
                      onChange={setSelectedUser}
                      className="w-56"
                    />
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Período</label>
                    <DatePickerWithRange date={date} onDateChange={setDate} />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleGenerateReport}
                  disabled={!date?.from || !date?.to}
                >
                  Gerar Relatório
                </Button>
              </div>
            </div>
          </Card>

          {columnsTable.length > 0 && reportData && (
            <>
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {reportData.reportTimeMirror.user.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {reportData.reportTimeMirror.user.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t pt-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Funcionário
                      </p>
                      <p className="font-semibold">
                        {reportData.reportTimeMirror.user?.name || "-"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Empresa</p>
                      <p className="font-semibold">
                        {reportData.reportTimeMirror.user.company?.name || "-"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Departamento
                      </p>
                      <p className="font-semibold">
                        {reportData.reportTimeMirror.user.department?.name ||
                          "-"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t pt-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Total de Registros
                      </p>
                      <p className="font-semibold">
                        {reportData.reportTimeMirror.daysWithRecords.length}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Período</p>
                      <p className="font-semibold">
                        {dayjs(date?.from).locale("pt-br").format("DD/MM/YYYY")}{" "}
                        - {dayjs(date?.to).locale("pt-br").format("DD/MM/YYYY")}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Tipo de Relatório
                      </p>
                      <p className="font-semibold">{selectedReport?.label}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <DataTable
                      columns={columnsTable}
                      data={dataTable}
                      disableSearch
                    />
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </DetailMain>
    </DetailPage>
  );
}
