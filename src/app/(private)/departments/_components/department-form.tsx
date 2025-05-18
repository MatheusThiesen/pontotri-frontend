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

interface DepartmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  department?: any;
}

const departmentFormSchema = z.object({
  name: z
    .string({ required_error: "Informe o nome do departamento" })
    .min(1, "O nome é obrigatória"),
});

type DepartmentFormSchemaProps = z.infer<typeof departmentFormSchema>;

export function DepartmentForm({
  open,
  onOpenChange,
  onSuccess,
  department,
}: DepartmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!department;

  const form = useForm<DepartmentFormSchemaProps>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: department?.name ?? "",
    },
  });

  async function onSubmit(data: DepartmentFormSchemaProps) {
    setIsSubmitting(true);

    try {
      if (isEditing && department) {
        // await updateDepartment({
        //   id: department.id,
        //   ...data,
        //   latitude: Number.parseFloat(data.latitude),
        //   longitude: Number.parseFloat(data.longitude),
        // })
      } else {
        // await createDepartment({
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
            {isEditing ? "Editar Departamento" : "Criar Departamento"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-2"
          >
            <InputForm
              control={form.control}
              name="name"
              label="Nome"
              placeholder="Informe o nome"
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
