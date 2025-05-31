"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BreakType,
  Weekday,
  type WorkScheduleDay,
} from "@/lib/dto/WorkSchedule";
import {
  calculateTotalWorkMinutes,
  formatMinutesToHours,
} from "@/lib/utils/date-time";
import { Clock, Plus, Settings, Trash } from "lucide-react";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { BreakConfigModal } from "./break-config-modal";

interface WorkScheduleDayTableProps {
  value: WorkScheduleDay[];
  onChange: (value: WorkScheduleDay[]) => void;
}

export function WorkScheduleDayTable({
  value,
  onChange,
}: WorkScheduleDayTableProps) {
  const [selectedDay, setSelectedDay] = useState<Weekday | "">("");
  const [breakModalOpen, setBreakModalOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState<WorkScheduleDay | null>(null);

  const availableWeekdays = Object.values(Weekday).filter(
    (day) => !value.some((scheduleDay) => scheduleDay.weekday === day)
  );

  const handleAddDay = () => {
    if (!selectedDay) return;

    const newDay: WorkScheduleDay = {
      id: crypto.randomUUID(),
      weekday: selectedDay,
      startTime: "09:00",
      endTime: "17:00",
      breakType: BreakType.NONE,
      breakDuration: 0,
      totalWorkMinutes: calculateTotalWorkMinutes(
        "09:00",
        "17:00",
        BreakType.NONE,
        0
      ),
    };

    onChange([...value, newDay]);
    setSelectedDay("");
  };

  const handleRemoveDay = (id: string) => {
    onChange(value.filter((day) => day.id !== id));
  };

  const updateDay = (
    id: string,
    field: keyof WorkScheduleDay,
    newValue: any
  ) => {
    const updatedDays = value.map((day) => {
      if (day.id === id) {
        const updatedDay = { ...day, [field]: newValue };

        // Recalculate total work minutes when relevant fields change
        if (field === "startTime" || field === "endTime") {
          updatedDay.totalWorkMinutes = calculateTotalWorkMinutes(
            updatedDay.startTime,
            updatedDay.endTime,
            updatedDay.breakType,
            updatedDay.breakDuration
          );
        }

        return updatedDay;
      }
      return day;
    });

    onChange(updatedDays);
  };

  const handleOpenBreakModal = (day: WorkScheduleDay) => {
    setCurrentDay(day);
    setBreakModalOpen(true);
  };

  const handleBreakConfigSave = (updatedDay: WorkScheduleDay) => {
    const updatedDays = value.map((day) =>
      day.id === updatedDay.id ? updatedDay : day
    );
    onChange(updatedDays);
    setBreakModalOpen(false);
  };

  const getWeekdayLabel = (weekday: Weekday) => {
    return weekday.charAt(0) + weekday.slice(1).toLowerCase();
  };

  // Get color for weekday badge
  const getWeekdayColor = (weekday: Weekday): string => {
    const colors: Record<Weekday, string> = {
      [Weekday.MONDAY]: "bg-blue-50 text-blue-700 border-blue-200",
      [Weekday.TUESDAY]: "bg-purple-50 text-purple-700 border-purple-200",
      [Weekday.WEDNESDAY]: "bg-green-50 text-green-700 border-green-200",
      [Weekday.THURSDAY]: "bg-amber-50 text-amber-700 border-amber-200",
      [Weekday.FRIDAY]: "bg-pink-50 text-pink-700 border-pink-200",
      [Weekday.SATURDAY]: "bg-orange-50 text-orange-700 border-orange-200",
      [Weekday.SUNDAY]: "bg-red-50 text-red-700 border-red-200",
    };
    return colors[weekday];
  };

  // Get break summary for display in table
  const getBreakSummary = (day: WorkScheduleDay): JSX.Element => {
    if (day.breakType === BreakType.NONE) {
      return (
        <span className="text-sm text-muted-foreground">Sem intervalo</span>
      );
    } else if (
      day.breakType === BreakType.FIXED &&
      day.breakStartWindow &&
      day.breakEndWindow
    ) {
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 border-amber-200 font-medium"
        >
          Fixo: {day.breakStartWindow} - {day.breakEndWindow} (
          {day.breakDuration} min)
        </Badge>
      );
    } else if (day.breakType === BreakType.FLEXIBLE) {
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 font-medium"
        >
          Livre: {day.breakDuration} min
        </Badge>
      );
    }
    return (
      <span className="text-sm text-muted-foreground">
        Configurar intervalo
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-sm border overflow-hidden bg-white shadow-sm">
        <Table className="border-collapse">
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent divide-x">
              <TableHead className="w-[120px]">Dia</TableHead>
              <TableHead>Início</TableHead>
              <TableHead>Término</TableHead>
              <TableHead>Intervalo</TableHead>
              <TableHead className=" text-center">Total</TableHead>
              <TableHead className="w-[80px]  text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {value.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Clock className="h-8 w-8 mb-2 opacity-40" />
                    <p>Nenhum dia configurado</p>
                    <p className="text-sm">Adicione um dia para começar</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              value.map((day) => (
                <TableRow
                  key={day.id}
                  className="hover:bg-gray-50 transition-colors divide-x"
                >
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-medium ${getWeekdayColor(day.weekday)}`}
                    >
                      {getWeekdayLabel(day.weekday)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="time"
                      value={day.startTime}
                      onChange={(e) =>
                        updateDay(day.id, "startTime", e.target.value)
                      }
                      className="w-28 rounded-md"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="time"
                      value={day.endTime}
                      onChange={(e) =>
                        updateDay(day.id, "endTime", e.target.value)
                      }
                      className="w-28 rounded-md"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getBreakSummary(day)}
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => handleOpenBreakModal(day)}
                        className="h-8 w-8 p-0 rounded-full"
                      >
                        <Settings className="h-4 w-4" />
                        <span className="sr-only">
                          Configurar intervalo para {day.weekday}
                        </span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Badge variant="secondary" className="font-medium">
                        {formatMinutesToHours(day.totalWorkMinutes)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDay(day.id)}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 rounded-full"
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Remover {day.weekday}</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <Select
          value={selectedDay}
          onValueChange={(value) => setSelectedDay(value as Weekday)}
          disabled={availableWeekdays.length === 0}
        >
          <SelectTrigger className="w-[180px] rounded-md">
            <SelectValue placeholder="Selecionar dia" />
          </SelectTrigger>
          <SelectContent>
            {availableWeekdays.length === 0 ? (
              <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                Todos os dias adicionados
              </div>
            ) : (
              availableWeekdays.map((day) => (
                <SelectItem key={day} value={day}>
                  {getWeekdayLabel(day)}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          className="h-9"
          onClick={handleAddDay}
          disabled={!selectedDay}
        >
          <Plus className="h-4 w-4 mr-1" />
          Adicionar
        </Button>
      </div>

      {currentDay && (
        <BreakConfigModal
          open={breakModalOpen}
          onOpenChange={setBreakModalOpen}
          day={currentDay}
          onSave={handleBreakConfigSave}
        />
      )}
    </div>
  );
}
