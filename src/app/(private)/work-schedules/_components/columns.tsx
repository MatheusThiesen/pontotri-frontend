"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Weekday, WorkSchedule } from "@/lib/hooks/use-fetch-work-schedules";
import { formatMinutesToHours } from "@/lib/utils/date-time";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";

const getWeekdayLabel = (weekday: Weekday): string => {
  return weekday.charAt(0);
};

const renderWeekdayBadges = (schedule: WorkSchedule) => {
  const allWeekdays = Object.values(Weekday);

  return (
    <div className="flex gap-1">
      {allWeekdays.map((day) => {
        const daySchedule = schedule.days.find(
          (f: any) => (Weekday as any)[f.weekday] === day
        );
        const isActive = !!daySchedule;

        return (
          <TooltipProvider key={day}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {getWeekdayLabel(day)}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {day.charAt(0) + day.slice(1).toLowerCase()}
                  {isActive
                    ? `: ${daySchedule?.startTime} - ${daySchedule?.endTime}`
                    : ": Não incluído"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export const columns: ColumnDef<WorkSchedule>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="font-medium text-primary">{row.getValue("name")}</div>
        <Badge variant="outline" className="w-fit">
          {row.original.days.length} dias
        </Badge>
      </div>
    ),
  },
  {
    id: "weeklyHours",
    header: "Horas Semanais",
    cell: ({ row }) => {
      const totalMinutes = row.original.days.reduce(
        (total, day) => total + day.totalWorkMinutes,
        0
      );

      return (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">
            {formatMinutesToHours(totalMinutes)}
          </span>
        </div>
      );
    },
  },
  {
    id: "workDays",
    header: "Jornada",
    cell: ({ row }) => renderWeekdayBadges(row.original as WorkSchedule),
  },
  {
    accessorKey: "updatedAt",
    header: "Atualizado em",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date;
      return (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{format(new Date(date), "dd/MM/yyyy")}</span>
        </div>
      );
    },
  },
];
