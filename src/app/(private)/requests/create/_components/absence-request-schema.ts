import { z } from "zod";

export type AbsenceKind = "ADJUSTMENT" | "VACATION" | "HEALTH" | "OTHER";

export const absenceKindLabels: Record<AbsenceKind, string> = {
  ADJUSTMENT: "Ajuste",
  VACATION: "Férias",
  HEALTH: "Saúde",
  OTHER: "Outro",
};

export const absenceRequestSchema = z
  .object({
    absenceKind: z.enum(
      ["ADJUSTMENT", "VACATION", "HEALTH", "OTHER"] as const,
      {
        required_error: "O tipo de ausência é obrigatório",
      }
    ),
    absenceStart: z.date({
      required_error: "A data de início é obrigatória",
    }),
    absenceEnd: z
      .date({
        required_error: "A data de fim é obrigatória",
      })
      .refine((date) => date >= new Date(), {
        message: "A data de fim deve ser maior ou igual à data atual",
      }),
    reason: z.string().min(1, "O motivo é obrigatório"),
    attachmentBase64: z
      .string()
      .optional()
      .refine(
        (value) => {
          // Se o tipo for HEALTH, o anexo é obrigatório
          if (value === undefined) {
            return true;
          }
          return value.length > 0;
        },
        {
          message:
            "O atestado médico é obrigatório para ausências por motivo de saúde",
        }
      ),
  })
  .refine(
    (data) => {
      // A data de fim deve ser maior ou igual à data de início
      if (!data.absenceStart || !data.absenceEnd) return true;
      return data.absenceEnd >= data.absenceStart;
    },
    {
      message: "A data de fim deve ser maior ou igual à data de início",
      path: ["absenceEnd"],
    }
  )
  .refine(
    (data) => {
      // Para férias, a solicitação deve ser feita com pelo menos 30 dias de antecedência
      if (data.absenceKind !== "VACATION") return true;
      if (!data.absenceStart) return true;

      const today = new Date();
      const diffTime = Math.abs(data.absenceStart.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays >= 30;
    },
    {
      message:
        "Solicitações de férias devem ser feitas com pelo menos 30 dias de antecedência",
      path: ["absenceStart"],
    }
  );

export type AbsenceRequestFormData = z.infer<typeof absenceRequestSchema>;
