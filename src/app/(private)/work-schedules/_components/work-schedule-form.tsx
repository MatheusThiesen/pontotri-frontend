"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { InputForm } from "@/components/form/InputForm";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import type { WorkSchedule } from "@/lib/types";
import {
  workScheduleSchema,
  type WorkScheduleFormValues,
} from "@/lib/validations/work-schedule";
import { WorkScheduleDayTable } from "./work-schedule-day-table";

interface WorkScheduleFormProps {
  workSchedule?: WorkSchedule;
}

export function WorkScheduleForm({ workSchedule }: WorkScheduleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const isEditing = !!workSchedule;

  const form = useForm<WorkScheduleFormValues>({
    resolver: zodResolver(workScheduleSchema),
    defaultValues: {
      name: workSchedule?.name || "",
      days: workSchedule?.days || [],
    },
  });

  async function onSubmit(data: WorkScheduleFormValues) {}

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
