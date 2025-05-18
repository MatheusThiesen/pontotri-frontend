import * as z from "zod";
import { Weekday } from "../types";

export const workScheduleDaySchema = z.object({
  id: z.string(),
  weekday: z.nativeEnum(Weekday),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Start time must be in HH:MM format",
  }),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "End time must be in HH:MM format",
  }),
  breakStartWindow: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Break start window must be in HH:MM format",
  }),
  breakEndWindow: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Break end window must be in HH:MM format",
  }),
  breakDuration: z.number().min(0).max(240),
  totalWorkMinutes: z.number().min(0),
});

export const workScheduleSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(100),
  days: z.array(workScheduleDaySchema),
});

export type WorkScheduleDayFormValues = z.infer<typeof workScheduleDaySchema>;
export type WorkScheduleFormValues = z.infer<typeof workScheduleSchema>;
