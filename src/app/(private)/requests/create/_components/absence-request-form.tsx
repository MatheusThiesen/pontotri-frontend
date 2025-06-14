"use client";

import { InputFileForm } from "@/components/form/InputFileForm";
import { SelectForm } from "@/components/form/SelectForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AlertCircle, Calendar, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  AbsenceRequestFormData,
  absenceKindLabels,
  absenceRequestSchema,
} from "./absence-request-schema";

export function AbsenceRequestForm() {
  const router = useRouter();
  const form = useForm<AbsenceRequestFormData>({
    resolver: zodResolver(absenceRequestSchema),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = async (data: AbsenceRequestFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const requestData = {
        type: "ABSENCE",
        ...data,
      };

      console.log("Submitting absence request:", requestData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const isHealthAbsence = form.watch("absenceKind") === "HEALTH";

  // Calculate days between dates
  const calculateDays = () => {
    const start = form.watch("absenceStart");
    const end = form.watch("absenceEnd");
    if (start && end) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Ausência</CardTitle>
            <CardDescription>
              Preencha os detalhes da sua solicitação de ausência
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tipo de Ausência */}
            <SelectForm
              control={form.control}
              name="absenceKind"
              label="Tipo de Ausência *"
              data={Object.entries(absenceKindLabels).map(([value, label]) => ({
                value,
                label,
              }))}
            />

            {/* Data de Início */}
            <FormField
              control={form.control}
              name="absenceStart"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de Início *</FormLabel>
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
                            : "Selecione a data de início"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Data de Fim */}
            <FormField
              control={form.control}
              name="absenceEnd"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de Fim *</FormLabel>
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
                            : "Selecione a data de fim"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < (form.watch("absenceStart") || new Date())
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Resumo dos dias */}
            {form.watch("absenceStart") && form.watch("absenceEnd") && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">
                  Total de dias: {calculateDays()}{" "}
                  {calculateDays() === 1 ? "dia" : "dias"}
                </p>
              </div>
            )}

            {/* Motivo */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo da Ausência *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o motivo da ausência..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload de Comprovante */}
            <div className="space-y-2">
              <Label htmlFor="attachment">
                Comprovante {isHealthAbsence ? "*" : "(Opcional)"}
              </Label>
              <div className="space-y-2">
                {!form.watch("attachmentBase64") ? (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="attachment"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">
                            Clique para enviar
                          </span>{" "}
                          ou arraste o arquivo
                        </p>
                        <p className="text-xs text-gray-500">
                          {isHealthAbsence
                            ? "Atestado médico obrigatório"
                            : "PNG, JPG ou PDF (MAX. 10MB)"}
                        </p>
                      </div>
                      <input
                        id="attachment"
                        type="file"
                        className="hidden"
                        accept=".png,.jpg,.jpeg,.pdf"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Upload className="w-5 h-5 mr-2 text-gray-500" />
                      <span className="text-sm font-medium">name</span>
                    </div>
                    <Button type="button" variant="ghost" size="sm">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <InputFileForm
              control={form.control}
              name="attachmentBase64"
              label={`Comprovante ${isHealthAbsence ? "*" : "(Opcional)"}`}
              description={
                isHealthAbsence
                  ? "Atestado médico obrigatório"
                  : "PNG, JPG ou PDF (MAX. 10MB)"
              }
            />
          </CardContent>
        </Card>

        {/* Alertas condicionais */}
        {isHealthAbsence && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Para ausências por motivo de saúde, é obrigatório anexar o
              atestado médico.
            </AlertDescription>
          </Alert>
        )}

        {form.watch("absenceKind") === "VACATION" && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Solicitações de férias devem ser feitas com pelo menos 30 dias de
              antecedência.
            </AlertDescription>
          </Alert>
        )}

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
