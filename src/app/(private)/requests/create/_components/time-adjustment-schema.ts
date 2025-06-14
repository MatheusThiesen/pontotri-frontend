import { TimeRecordType } from "@/lib/hooks/use-fetch-records";
import { z } from "zod";

export const timeAdjustmentSchema = z.object({
  adjustmentDate: z.date({
    required_error: "A data do ajuste é obrigatória",
  }),
  reason: z.string().min(1, "O motivo é obrigatório"),
  adjustedTimes: z
    .array(
      z.object({
        id: z.string(),
        time: z.string().min(1, "O horário é obrigatório"),
        type: z.nativeEnum(TimeRecordType),
      })
    )
    .min(1, "Pelo menos um horário deve ser informado"),
});

export type TimeAdjustmentFormData = z.infer<typeof timeAdjustmentSchema>;
