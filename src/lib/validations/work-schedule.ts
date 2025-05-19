import * as z from "zod";
import { BreakType, Weekday } from "../types";

export const workScheduleDaySchema = z.object({
  id: z.string(),
  weekday: z.nativeEnum(Weekday),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "O horário de início deve estar no formato HH:MM",
  }),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "O horário de término deve estar no formato HH:MM",
  }),
  breakType: z.nativeEnum(BreakType),
  breakStartWindow: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "O início da pausa deve estar no formato HH:MM",
    })
    .optional(),
  breakEndWindow: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "O fim da pausa deve estar no formato HH:MM",
    })
    .optional(),
  breakDuration: z
    .number()
    .min(0, {
      message: "A duração da pausa deve ser maior ou igual a 0 minutos",
    })
    .max(240, {
      message: "A duração da pausa não pode exceder 240 minutos",
    }),
  totalWorkMinutes: z.number().min(0, {
    message: "O total de minutos trabalhados deve ser maior ou igual a 0",
  }),
});

export const workScheduleSchema = z.object({
  name: z
    .string()
    .min(1, { message: "O nome é obrigatório" })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres" }),
  days: z.array(workScheduleDaySchema),
});

export type WorkScheduleDayFormValues = z.infer<typeof workScheduleDaySchema>;
export type WorkScheduleFormValues = z.infer<typeof workScheduleSchema>;
