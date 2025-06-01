"use client";

import {
  DetailGoBack,
  DetailHeader,
  DetailMain,
  DetailPage,
  DetailTitle,
} from "@/components/layouts/detail";
import { useFetchWorkSchedule } from "@/lib/hooks/use-fetch-work-schedules";
import { useParams } from "next/navigation";
import { WorkScheduleForm } from "../_components/work-schedule-form";

export default function Page() {
  const params = useParams();
  const id = params?.id as string;
  const { data: fetchWorkSchedule, isLoading } = useFetchWorkSchedule(
    String(id)
  );

  return (
    <DetailPage>
      <DetailHeader>
        <DetailGoBack />
        <DetailTitle>Jornada de trabalho</DetailTitle>
      </DetailHeader>
      <DetailMain isLoading={isLoading}>
        <WorkScheduleForm workSchedule={fetchWorkSchedule} />
      </DetailMain>
    </DetailPage>
  );
}
