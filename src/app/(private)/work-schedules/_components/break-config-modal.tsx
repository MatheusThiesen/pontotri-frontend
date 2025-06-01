"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  BreakType,
  type WorkScheduleDay,
} from "@/lib/hooks/use-fetch-work-schedules";
import {
  calculateBreakDuration,
  calculateTotalWorkMinutes,
} from "@/lib/utils/date-time";
import { useState } from "react";

interface BreakConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  day: WorkScheduleDay;
  onSave: (updatedDay: WorkScheduleDay) => void;
}

export function BreakConfigModal({
  open,
  onOpenChange,
  day,
  onSave,
}: BreakConfigModalProps) {
  const [breakType, setBreakType] = useState<BreakType>(day.breakType);
  const [breakStartWindow, setBreakStartWindow] = useState<string>(
    day.breakStartWindow || "12:00"
  );
  const [breakEndWindow, setBreakEndWindow] = useState<string>(
    day.breakEndWindow || "13:00"
  );
  const [breakDuration, setBreakDuration] = useState<number>(day.breakDuration);

  const handleSave = () => {
    let updatedBreakDuration = breakDuration;

    if (breakType === BreakType.FIXED) {
      updatedBreakDuration = calculateBreakDuration(
        breakStartWindow,
        breakEndWindow
      );
    }

    if (breakType === BreakType.NONE) {
      updatedBreakDuration = 0;
    }

    const updatedDay: WorkScheduleDay = {
      ...day,
      breakType,
      breakStartWindow:
        breakType === BreakType.FIXED ? breakStartWindow : undefined,
      breakEndWindow:
        breakType === BreakType.FIXED ? breakEndWindow : undefined,
      breakDuration: updatedBreakDuration,
      totalWorkMinutes: calculateTotalWorkMinutes(
        day.startTime,
        day.endTime,
        breakType,
        updatedBreakDuration
      ),
    };

    onSave(updatedDay);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Configurar Intervalo</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <RadioGroup
            value={breakType}
            onValueChange={(value) => setBreakType(value as BreakType)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={BreakType.NONE} id="break-none" />
              <Label htmlFor="break-none" className="font-medium">
                Sem intervalo
              </Label>
              <span className="text-sm text-muted-foreground ml-2">
                Jornada contínua sem pausas
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value={BreakType.FIXED} id="break-fixed" />
              <Label htmlFor="break-fixed" className="font-medium">
                Horário fixo
              </Label>
              <span className="text-sm text-muted-foreground ml-2">
                Intervalo com horário de início e fim definidos
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value={BreakType.FLEXIBLE} id="break-flexible" />
              <Label htmlFor="break-flexible" className="font-medium">
                Duração livre
              </Label>
              <span className="text-sm text-muted-foreground ml-2">
                Apenas a duração do intervalo é definida
              </span>
            </div>
          </RadioGroup>

          {breakType === BreakType.FIXED && (
            <div className="space-y-4 pt-2 border-t">
              <h3 className="text-sm font-medium">
                Configuração de Horário Fixo
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="break-start">Início do intervalo</Label>
                  <Input
                    id="break-start"
                    type="time"
                    value={breakStartWindow}
                    onChange={(e) => setBreakStartWindow(e.target.value)}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="break-end">Fim do intervalo</Label>
                  <Input
                    id="break-end"
                    type="time"
                    value={breakEndWindow}
                    onChange={(e) => setBreakEndWindow(e.target.value)}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Duração calculada:{" "}
                <span className="font-medium">
                  {calculateBreakDuration(breakStartWindow, breakEndWindow)}{" "}
                  minutos
                </span>
              </div>
            </div>
          )}

          {breakType === BreakType.FLEXIBLE && (
            <div className="space-y-4 pt-2 border-t">
              <h3 className="text-sm font-medium">
                Configuração de Duração Livre
              </h3>
              <div className="flex items-center gap-2 max-w-xs">
                <Label htmlFor="break-duration" className="w-32">
                  Duração
                </Label>
                <Input
                  id="break-duration"
                  type="number"
                  min="0"
                  max="240"
                  value={breakDuration}
                  onChange={(e) =>
                    setBreakDuration(Number.parseInt(e.target.value, 10))
                  }
                  className="rounded-lg"
                />
                <span className="text-sm text-muted-foreground">min</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-full"
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} className="rounded-full">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
