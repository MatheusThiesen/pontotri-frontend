export enum Weekday {
  MONDAY = "SEGUNDA",
  TUESDAY = "TERÇA",
  WEDNESDAY = "QUARTA",
  THURSDAY = "QUINTA",
  FRIDAY = "SEXTA",
  SATURDAY = "SÁBADO",
  SUNDAY = "DOMINGO",
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
