import { WorkSchedule } from "../hooks/use-fetch-work-schedules";
import { api } from "../services/api";
import { useEntityActions } from "./use-entity-actions";

const createWorkSchedule = async (
  workSchedule: Omit<WorkSchedule, "id" | "createdAt" | "updatedAt"> & {
    companyId: string;
  }
): Promise<WorkSchedule> => {
  const { data } = await api.post("/work-schedules", workSchedule);
  return data;
};

const updateWorkSchedule = async (
  workSchedule: Omit<WorkSchedule, "createdAt" | "updatedAt">
): Promise<WorkSchedule> => {
  const { data } = await api.put(
    `/work-schedules/${workSchedule.id}`,
    workSchedule
  );
  return data;
};

const deleteWorkSchedule = async (workScheduleId: string) => {
  await api.delete(`/work-schedules/${workScheduleId}`);
};

export const useWorkScheduleActions = () => {
  return useEntityActions<
    WorkSchedule,
    Omit<WorkSchedule, "id" | "createdAt" | "updatedAt"> & {
      companyId: string;
    },
    Omit<WorkSchedule, "createdAt" | "updatedAt">
  >("work-schedules", {
    createFn: createWorkSchedule,
    updateFn: updateWorkSchedule,
    deleteFn: deleteWorkSchedule,
  });
};
