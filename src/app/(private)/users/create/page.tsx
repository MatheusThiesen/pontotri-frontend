"use client";

import {
  DetailGoBack,
  DetailHeader,
  DetailPage,
  DetailTitle,
} from "@/components/layouts/detail";
import { UserForm } from "../_components/user-form";

export default function CreateUserPage() {
  return (
    <DetailPage>
      <DetailHeader>
        <DetailGoBack />
        <DetailTitle>Criar Colaborador</DetailTitle>
      </DetailHeader>
      <UserForm />
    </DetailPage>
  );
}
