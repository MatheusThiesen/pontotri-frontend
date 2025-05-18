"use client";

import {
  DetailGoBack,
  DetailHeader,
  DetailPage,
  DetailTitle,
} from "@/components/layouts/detail";
import { WorkScheduleForm } from "../_components/work-schedule-form";

export default function Requests() {
  return (
    <DetailPage>
      <DetailHeader>
        <DetailGoBack />
        <DetailTitle>Criar Jornada de trabalho</DetailTitle>
      </DetailHeader>
      <WorkScheduleForm />
    </DetailPage>
  );
}
