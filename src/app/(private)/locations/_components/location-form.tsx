"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { InputForm } from "@/components/form/InputForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { z } from "zod";

interface LocationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  location?: any;
}

const locationFormSchema = z.object({
  description: z
    .string({ required_error: "Informe a descrição da localização" })
    .min(1, "A descrição é obrigatória"),

  latitude: z.coerce
    .number({
      required_error: "Informe a latitude",
      invalid_type_error: "A latitude deve ser um número",
    })
    .refine((val) => val >= -90 && val <= 90, {
      message: "Latitude inválida. O valor deve estar entre -90 e 90 graus.",
    }),

  longitude: z.coerce
    .number({
      required_error: "Informe a longitude",
      invalid_type_error: "A longitude deve ser um número",
    })
    .refine((val) => val >= -180 && val <= 180, {
      message: "Longitude inválida. O valor deve estar entre -180 e 180 graus.",
    }),
});

type LocationFormSchemaProps = z.infer<typeof locationFormSchema>;

export function LocationForm({
  open,
  onOpenChange,
  onSuccess,
  location,
}: LocationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!location;

  const form = useForm<LocationFormSchemaProps>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      description: location?.description ?? "",
      latitude: location?.latitude ?? "0",
      longitude: location?.longitude ?? "0",
    },
  });

  async function onSubmit(data: LocationFormSchemaProps) {
    setIsSubmitting(true);

    try {
      if (isEditing && location) {
        // await updateLocation({
        //   id: location.id,
        //   ...data,
        //   latitude: Number.parseFloat(data.latitude),
        //   longitude: Number.parseFloat(data.longitude),
        // })
      } else {
        // await createLocation({
        //   ...data,
        //   latitude: Number.parseFloat(data.latitude),
        //   longitude: Number.parseFloat(data.longitude),
        // })
      }
      onSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Localização" : "Criar Localização"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-2"
          >
            <InputForm
              control={form.control}
              name="description"
              label="Descrição"
              placeholder="Informe a descrição"
            />
            <InputForm
              control={form.control}
              name="latitude"
              type="number"
              label="Latitude"
              placeholder="Informe a latitude"
            />

            <InputForm
              control={form.control}
              name="longitude"
              type="number"
              label="Longitude"
              placeholder="Informe a longitude"
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isEditing ? "Atualizar" : "Criar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
