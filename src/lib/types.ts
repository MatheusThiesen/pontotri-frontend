export enum Weekday {
  MONDAY = "SEGUNDA",
  TUESDAY = "TERÇA",
  WEDNESDAY = "QUARTA",
  THURSDAY = "QUINTA",
  FRIDAY = "SEXTA",
  SATURDAY = "SÁBADO",
  SUNDAY = "DOMINGO",
}

export interface WorkScheduleDay {
  id: string;
  weekday: Weekday;
  startTime: string; // format "HH:MM"
  endTime: string; // format "HH:MM"
  breakStartWindow: string; // format "HH:MM"
  breakEndWindow: string; // format "HH:MM"
  breakDuration: number; // in minutes
  totalWorkMinutes: number; // calculated
}

export interface WorkSchedule {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  days: WorkScheduleDay[];
}
