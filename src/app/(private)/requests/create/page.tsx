"use client";

import {
  DetailGoBack,
  DetailHeader,
  DetailPage,
  DetailTitle,
} from "@/components/layouts/detail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { AbsenceRequestForm } from "./_components/absence-request-form";
import { TimeAdjustmentForm } from "./_components/time-adjustment-form";

interface AdjustedTime {
  id: string;
  time: string;
  type: "CHECK_IN" | "CHECK_OUT";
}

export default function TimeAdjustmentPage() {
  const router = useRouter();

  return (
    <DetailPage>
      <DetailHeader>
        <DetailGoBack />

        <DetailTitle>Criar Solicitação</DetailTitle>
      </DetailHeader>

      <div className="container mx-auto max-w-2xl p-4">
        <Tabs defaultValue="time-adjustment">
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="time-adjustment">Ajuste de Ponto</TabsTrigger>
            <TabsTrigger value="absence-request">
              Solicitação de Ausência
            </TabsTrigger>
          </TabsList>
          <TabsContent value="time-adjustment" className="space-y-4">
            <TimeAdjustmentForm />
          </TabsContent>
          <TabsContent value="absence-request" className="space-y-4">
            <AbsenceRequestForm />
          </TabsContent>
        </Tabs>
      </div>
    </DetailPage>
  );
}
