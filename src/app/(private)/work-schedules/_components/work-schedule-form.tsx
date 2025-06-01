"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { InputForm } from "@/components/form/InputForm";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { useWorkScheduleActions } from "@/lib/actions/use-work-schedule-actions";
import { useAuth } from "@/lib/contexts/AuthProvider";
import {
  Weekday,
  WeekdayPortugueseToEnglish,
  WorkSchedule,
} from "@/lib/hooks/use-fetch-work-schedules";
import {
  workScheduleSchema,
  type WorkScheduleFormValues,
} from "@/lib/validations/work-schedule";
import axios from "axios";
import { toast } from "sonner";
import { WorkScheduleDayTable } from "./work-schedule-day-table";

interface WorkScheduleFormProps {
  workSchedule?: WorkSchedule;
}

export function WorkScheduleForm({ workSchedule }: WorkScheduleFormProps) {
  const { me } = useAuth();
  const { createMutation, updateMutation } = useWorkScheduleActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!workSchedule;

  const form = useForm<WorkScheduleFormValues>({
    resolver: zodResolver(workScheduleSchema),
    defaultValues: {
      name: workSchedule?.name || "",
      days:
        workSchedule?.days.map((day) => ({
          ...day,
          weekday: (Weekday as any)[day.weekday],
        })) || [],
    },
  });

  async function onSubmit(data: WorkScheduleFormValues) {
    try {
      if (isEditing && workSchedule) {
        await updateMutation.mutateAsync({
          id: workSchedule.id,
          name: data.name,
          days: data.days.map((day) => ({
            ...day,
            weekday: WeekdayPortugueseToEnglish[day.weekday] as any,
          })),
        });
      } else {
        await createMutation.mutateAsync({
          name: data.name,
          days: data.days.map((day) => ({
            ...day,
            weekday: WeekdayPortugueseToEnglish[day.weekday] as any,
          })),
          companyId: me.companyId,
        });
        form.reset();
      }
      toast.success("Ação realizada com sucesso");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.warning(
          err.response?.data.message || "Erro ao enviar o formulário"
        );
      } else {
        toast.error("Erro desconhecido ao enviar o formulário");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputForm
          label="Nome da Jornada"
          control={form.control}
          name="name"
          placeholder="Digite o nome da jornada"
        />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Dias de Trabalho</h2>
          <FormField
            control={form.control}
            name="days"
            render={({ field }) => (
              <FormItem>
                <WorkScheduleDayTable
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Atualizar" : "Criar"} Jornada
          </Button>
        </div>
      </form>
    </Form>
  );
}
