"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { InputForm } from "@/components/form/InputForm";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { useFetchDepartments } from "@/lib/hooks/use-fetch-departments";

import { useFetchWorkSchedules } from "@/lib/hooks/use-fetch-work-schedules";

import { GroupInput } from "@/components/form/GroupInput";
import { InputFileForm } from "@/components/form/InputFileForm";
import { SelectForm } from "@/components/form/SelectForm";
import { useUserActions } from "@/lib/actions/use-user-actions";
import { useAuth } from "@/lib/contexts/AuthProvider";
import { User, UserRole } from "@/lib/hooks/use-fetch-users";
import {
  UserFormValues,
  createUserSchema,
  updateUserSchema,
} from "@/lib/validations/user";
import axios from "axios";
import { toast } from "sonner";

interface UserFormProps {
  user?: User;
}

export function UserForm({ user }: UserFormProps) {
  const { me } = useAuth();
  const { createMutation, updateMutation } = useUserActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: departments } = useFetchDepartments({ page: 1, pagesize: 99 });
  const { data: workSchedules } = useFetchWorkSchedules({
    page: 1,
    pagesize: 100,
  });

  const isEditing = !!user;

  const form = useForm<UserFormValues>({
    resolver: zodResolver(isEditing ? updateUserSchema : createUserSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: undefined,
      role: user?.role || UserRole.EMPLOYEE,
      isActive: user?.isActive ?? true,
      profileImage: user?.profileImage || "",
      departmentId: user?.departmentId || "",
      workScheduleId: user?.workScheduleId || "",
    },
  });

  async function onSubmit(data: UserFormValues) {
    try {
      setIsSubmitting(true);
      if (isEditing && user) {
        await updateMutation.mutateAsync({
          id: user.id,
          ...data,
        });
      } else {
        await createMutation.mutateAsync({
          ...data,
          companyId: me.companyId,
          password: data.password ?? "",
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
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Usuário Ativo</Label>
                <div className="text-sm text-muted-foreground">
                  Desative para impedir o acesso do usuário
                </div>
              </div>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormItem>
          )}
        />

        <GroupInput>
          <InputForm
            label="Nome"
            control={form.control}
            name="name"
            placeholder="Digite o nome do usuário"
          />

          <InputForm
            label="E-mail"
            control={form.control}
            name="email"
            placeholder="Digite o e-mail do usuário"
            type="email"
          />
        </GroupInput>

        {!isEditing && (
          <InputForm
            label="Senha"
            control={form.control}
            name="password"
            placeholder="Digite a senha do usuário"
            isPass
          />
        )}

        <GroupInput>
          <SelectForm
            label="Departamento"
            name="departmentId"
            placeholder="Selecione o departamento"
            control={form.control}
            data={
              departments?.data.map((item) => ({
                label: item.name,
                value: item.id,
              })) ?? []
            }
          />

          <SelectForm
            label="Jornada de Trabalho"
            name="workScheduleId"
            placeholder="Selecione a jornada"
            control={form.control}
            data={
              workSchedules?.data.map((item) => ({
                label: item.name,
                value: item.id,
              })) ?? []
            }
          />

          <SelectForm
            label="Função"
            name="role"
            control={form.control}
            data={[
              { value: "OWNER", label: "Proprietário" },
              { value: "MANAGER", label: "Gerente" },
              { value: "EMPLOYEE", label: "Colaborador" },
            ]}
          />
        </GroupInput>

        <InputFileForm
          label="Foto do colaborador"
          control={form.control}
          name="profileImage"
        />

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Atualizar" : "Criar"} Usuário
          </Button>
        </div>
      </form>
    </Form>
  );
}
