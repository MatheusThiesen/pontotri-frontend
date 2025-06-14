"use client";

import { InputForm } from "@/components/form/InputForm";
import { SelectForm } from "@/components/form/SelectForm";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  TIME_RECORD_TYPE_LABELS,
  TimeRecordType,
} from "@/lib/hooks/use-fetch-records";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import {
  TimeAdjustmentFormData,
  timeAdjustmentSchema,
} from "./time-adjustment-schema";

export function TimeAdjustmentForm() {
  const router = useRouter();
  const form = useForm<TimeAdjustmentFormData>({
    resolver: zodResolver(timeAdjustmentSchema),
    defaultValues: {
      adjustedTimes: [{ id: "1", time: "", type: TimeRecordType.ENTRY }],
      reason: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "adjustedTimes",
    control: form.control,
  });

  const addTimeEntry = () => {
    if (fields.length >= 4) return;

    // Encontrar o próximo tipo disponível
    const usedTypes = new Set(fields.map((field) => field.type));
    const availableTypes = Object.values(TimeRecordType).filter(
      (type) => !usedTypes.has(type)
    );

    if (availableTypes.length === 0) return;

    append({
      id: Date.now().toString(),
      time: "",
      type: availableTypes[0],
    });
  };

  const onSubmit = async (data: TimeAdjustmentFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const requestData = {
        type: "TIME_ADJUSTMENT",
        ...data,
        adjustedTimes: data.adjustedTimes.filter((entry) => entry.time),
      };

      console.log("Submitting time adjustment request:", requestData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Função para verificar se um tipo já está em uso
  const isTypeUsed = (type: TimeRecordType) => {
    return fields.some((field) => field.type === type);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Ajuste</CardTitle>
            <CardDescription>
              Selecione a data e informe os horários corretos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Data do Ajuste */}
            <FormField
              control={form.control}
              name="adjustmentDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data do Ajuste *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "PPP", { locale: ptBR })
                            : "Selecione a data"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Horários Ajustados */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FormLabel>Horários Corretos *</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTimeEntry}
                  disabled={fields.length >= 4}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Adicionar
                </Button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index: number) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <SelectForm
                      control={form.control}
                      name={`adjustedTimes.${index}.type`}
                      data={Object.entries(TIME_RECORD_TYPE_LABELS).map(
                        ([value, label]) => ({
                          value,
                          label,
                        })
                      )}
                      className="w-48"
                    />

                    <InputForm
                      control={form.control}
                      name={`adjustedTimes.${index}.time`}
                      type="time"
                      className="flex-1"
                      placeholder="00:00"
                    />

                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Motivo */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo do Ajuste *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o motivo da solicitação de ajuste..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Botões de ação */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Enviando..." : "Enviar Solicitação"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
