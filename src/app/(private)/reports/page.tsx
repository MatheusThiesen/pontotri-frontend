"use client";

import {
  ListingHeader,
  ListingMain,
  ListingPage,
  ListingTitle,
} from "@/components/layouts/listing";
import { Card } from "@/components/ui/card";
import { reports } from "@/lib/hooks/use-reports";
import { useRouter } from "next/navigation";

export default function Reports() {
  const router = useRouter();

  const handleReportClick = (reportId: string) => {
    router.push(`/reports/${reportId}`);
  };

  return (
    <ListingPage>
      <ListingHeader>
        <ListingTitle>Meus Relatórios</ListingTitle>
      </ListingHeader>

      <ListingMain>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {reports.map((report) => (
            <Card
              key={report.key}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleReportClick(report.key)}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <report.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{report.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {report.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ListingMain>
    </ListingPage>
  );
}
