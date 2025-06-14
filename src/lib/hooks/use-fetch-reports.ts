import { api } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";
import { TimeRecordType } from "./use-fetch-records";
import { User } from "./use-fetch-users";
import { BreakType, Weekday } from "./use-fetch-work-schedules";

type KeyReport =
  | "time-mirror"
  | "overtime"
  | "delays"
  | "detailed"
  | "home-analytic";

type FetchReportsRequest = {
  key: KeyReport;
  dateStart?: Date;
  dateEnd?: Date;
  userId?: string;
};

type HomeAnalyticProps = {
  lastRecords: { date: Date; type: TimeRecordType }[];
  nextDays: { date: Date; isWorker: boolean; hours?: string }[];
  totalHours: number;
  monthDays: {
    present: number;
    days: number;
    percentage: number;
  };
};

type ReportTimeMirrorProps = {
  daysWithRecords: {
    date: Date;
    isWorker: boolean;
    records: { id: string; createdAt: Date; type: TimeRecordType }[];
    user: User;
  }[];
  recordColumns: TimeRecordType[];
  workSchedule?: {
    name: string;

    days?: {
      id: string;
      weekday: Weekday;
      startTime: string;
      endTime: string;
      breakType: BreakType;
      breakStartWindow: string | null;
      breakEndWindow: string | null;
      breakDuration: number | null;
    }[];
  };
};

export interface FetchReportsResponse {
  homeAnalytic: HomeAnalyticProps;
  reportTimeMirror: ReportTimeMirrorProps;
}

export const fetchReports = async ({
  key,
  dateEnd,
  dateStart,
  userId,
}: FetchReportsRequest): Promise<FetchReportsResponse> => {
  const { data } = await api.get<FetchReportsResponse>(`/reports/${key}`, {
    params: { key, dateEnd, dateStart, userId },
  });

  return data;
};

export const useFetchReports = ({
  key,
  dateEnd,
  dateStart,
  userId,
}: FetchReportsRequest) => {
  return useQuery({
    queryKey: ["reports", key, dateEnd, dateStart, userId],
    queryFn: () => fetchReports({ key, dateEnd, dateStart, userId }),
  });
};
