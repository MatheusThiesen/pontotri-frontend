import { api } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Location } from "./use-fetch-locations";
import { User } from "./use-fetch-users";
import { WorkSchedule } from "./use-fetch-work-schedules";

export enum TimeRecordType {
  ENTRY = "ENTRY", // Entrada no trabalho
  EXIT = "EXIT", // Saída do trabalho
  BREAK_START = "BREAK_START", // Início do intervalo
  BREAK_END = "BREAK_END", // Fim do intervalo
}

export const TIME_RECORD_TYPE_LABELS: Record<TimeRecordType, string> = {
  [TimeRecordType.ENTRY]: "Entrada",
  [TimeRecordType.EXIT]: "Saída",
  [TimeRecordType.BREAK_START]: "Início do Intervalo",
  [TimeRecordType.BREAK_END]: "Fim do Intervalo",
};

export enum TimeRecordToColumnData {
  ENTRY = "startTime",
  EXIT = "endTime",
  BREAK_START = "breakStartWindow",
  BREAK_END = "breakEndWindow",
}

export const TIME_RECORD_TYPE_COLORS: Record<TimeRecordType, string> = {
  [TimeRecordType.ENTRY]: "bg-green-50 text-green-700 border-green-200",
  [TimeRecordType.EXIT]: "bg-red-50 text-red-700 border-red-200",
  [TimeRecordType.BREAK_START]: "bg-blue-50 text-blue-700 border-blue-200",
  [TimeRecordType.BREAK_END]: "bg-purple-50 text-purple-700 border-purple-200",
};

export interface TimeRecord {
  id: string;
  type: TimeRecordType;
  latitude: number | undefined;
  longitude: number | undefined;
  createdAt: Date;
  createdAtToFormat: string;
  userId: string;
  user?: User;
  locationId: string | undefined;
  location: Location;
  workScheduleId: string | undefined;
  workSchedule: WorkSchedule;
  companyId: string;
}

interface FilterFetchTimeRecordParams {
  userId?: string;
  createdAt?: string;
}

interface FetchUsersParams extends PaginationRequest {
  filters?: FilterFetchTimeRecordParams;
}

const normalized = (row: TimeRecord) => {
  return {
    ...row,
    createdAtToFormat: format(new Date(row.createdAt), "dd/MM/yyyy HH:mm"),
  };
};

const fetchRecords = async ({
  page,
  pagesize,
  filters,
}: FetchUsersParams): Promise<PaginatedResponse<TimeRecord>> => {
  const { data } = await api.get<PaginatedResponse<TimeRecord>>("/records", {
    params: { page, pagesize, ...filters },
  });

  return { ...data, data: data.data.map(normalized) };
};

export const useFetchRecords = ({
  page,
  pagesize,
  filters,
}: FetchUsersParams) => {
  return useQuery({
    queryKey: ["records", page, pagesize, filters],
    queryFn: () => fetchRecords({ page, pagesize, filters }),
  });
};
