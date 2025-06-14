"use client";

import { HomeSkeleton } from "@/components/home-skeleton";
import {
  DetailPage,
  DetailSubtitle,
  DetailTitle,
} from "@/components/layouts/detail";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TIME_RECORD_TYPE_LABELS } from "@/lib/hooks/use-fetch-records";
import { useFetchReports } from "@/lib/hooks/use-fetch-reports";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  BriefcaseBusiness,
  Calendar,
  Clock,
  LogOut,
  UtensilsCrossed,
} from "lucide-react";

export default function Home() {
  const { data: getReport, isLoading } = useFetchReports({
    key: "home-analytic",
  });

  if (isLoading) {
    return <HomeSkeleton />;
  }

  const homeAnalytic = {
    lastRecords: getReport?.homeAnalytic.lastRecords ?? [],
    nextDays: getReport?.homeAnalytic.nextDays ?? [],
    totalHours: (getReport?.homeAnalytic.totalHours ?? 0).toFixed(0),
    monthDays: getReport?.homeAnalytic.monthDays ?? {
      present: 0,
      days: 0,
      percentage: 0,
    },
  };

  return (
    <DetailPage>
      <DetailTitle>Início</DetailTitle>
      <DetailSubtitle>
        Bem-vindo de volta! Aqui está um resumo da sua frequência.
      </DetailSubtitle>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Totais</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{homeAnalytic.totalHours}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dias Presentes
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {homeAnalytic.monthDays.present}/{homeAnalytic.monthDays.days}
            </div>
            <p className="text-xs text-muted-foreground">
              {homeAnalytic.monthDays.percentage}% de taxa de presença
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Sua atividade recente de registro de tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {homeAnalytic.lastRecords.map((record, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                    {["ENTRY", "BREAK_END"].includes(record.type) ? (
                      <BriefcaseBusiness className="h-5 w-5 text-gray-500" />
                    ) : ["BREAK_START"].includes(record.type) ? (
                      <UtensilsCrossed className="h-5 w-5 text-gray-500" />
                    ) : (
                      <LogOut className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase">
                      {TIME_RECORD_TYPE_LABELS[record.type]}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(record.date), "dd/MM/yyyy, hh:mm:ss a")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Horários</CardTitle>
            <CardDescription>
              Sua agenda de trabalho para os próximos dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {homeAnalytic.nextDays.map((day, i) => {
                return (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <span className="text-sm font-medium">
                          {format(day.date, "dd")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium uppercase">
                          {format(day.date, "cccc", { locale: ptBR })}
                        </p>
                        <p className="text-xs text-gray-500">
                          {!day.isWorker ? "Folga" : day.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DetailPage>
  );
}
