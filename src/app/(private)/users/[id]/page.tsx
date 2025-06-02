"use client";

import {
  DetailGoBack,
  DetailHeader,
  DetailMain,
  DetailPage,
  DetailTitle,
} from "@/components/layouts/detail";
import { useFetchUser } from "@/lib/hooks/use-fetch-users";
import { useParams } from "next/navigation";
import { UserForm } from "../_components/user-form";

export default function EditUserPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data: user, isLoading } = useFetchUser(id);

  return (
    <DetailPage>
      <DetailHeader>
        <DetailGoBack />
        <DetailTitle>Editar Colaborador</DetailTitle>
      </DetailHeader>
      <DetailMain isLoading={isLoading}>
        <UserForm user={user} />
      </DetailMain>
    </DetailPage>
  );
}
