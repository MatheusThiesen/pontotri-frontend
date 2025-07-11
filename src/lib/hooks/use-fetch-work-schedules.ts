import { api } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";

export enum Weekday {
  MONDAY = "SEGUNDA",
  TUESDAY = "TERÇA",
  WEDNESDAY = "QUARTA",
  THURSDAY = "QUINTA",
  FRIDAY = "SEXTA",
  SATURDAY = "SÁBADO",
  SUNDAY = "DOMINGO",
}

export enum WeekdayPortugueseToEnglish {
  "SEGUNDA" = "MONDAY",
  "TERÇA" = "TUESDAY",
  "QUARTA" = "WEDNESDAY",
  "QUINTA" = "THURSDAY",
  "SEXTA" = "FRIDAY",
  "SÁBADO" = "SATURDAY",
  "DOMINGO" = "SUNDAY",
}

export enum BreakType {
  NONE = "NONE",
  FIXED = "FIXED",
  FLEXIBLE = "FLEXIBLE",
}

export interface WorkScheduleDay {
  id: string;
  weekday: Weekday;
  startTime: string; // format "HH:MM"
  endTime: string; // format "HH:MM"
  breakType: BreakType;
  breakStartWindow?: string; // format "HH:MM", only for FIXED type
  breakEndWindow?: string; // format "HH:MM", only for FIXED type
  breakDuration: number; // in minutes, for both FIXED and FLEXIBLE types
  totalWorkMinutes: number; // calculated
}

export interface WorkSchedule {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  days: WorkScheduleDay[];
}

const fetchWorkSchedules = async ({
  page,
  pagesize,
}: PaginationRequest): Promise<PaginatedResponse<WorkSchedule>> => {
  const { data } = await api.get("/work-schedules", {
    params: { page, pagesize },
  });

  return data;
};
export const useFetchWorkSchedules = ({
  page,
  pagesize,
}: PaginationRequest) => {
  return useQuery({
    queryKey: ["work-schedules", page, pagesize],
    queryFn: () => fetchWorkSchedules({ page, pagesize }),
  });
};

const fetchWorkSchedule = async (id: string): Promise<WorkSchedule> => {
  const { data } = await api.get(`/work-schedules/${id}`);

  return data;
};

export const useFetchWorkSchedule = (id: string) => {
  return useQuery({
    queryKey: ["work-schedules", id],
    queryFn: () => fetchWorkSchedule(id),
  });
};
