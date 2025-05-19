import { BreakType } from "../types";

export function calculateTotalWorkMinutes(
  startTime: string,
  endTime: string,
  breakType: BreakType,
  breakDuration: number
): number {
  // Parse times
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  // Calculate total minutes
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  // Calculate work minutes
  let totalWorkMinutes = endTotalMinutes - startTotalMinutes;

  // Handle case where end time is on the next day
  if (totalWorkMinutes < 0) {
    totalWorkMinutes += 24 * 60; // Add a full day in minutes
  }

  // Subtract break duration if there is a break
  if (breakType !== BreakType.NONE) {
    return totalWorkMinutes - breakDuration;
  }

  return totalWorkMinutes;
}

export function formatMinutesToHours(minutes: number): string {
  if (minutes < 0) return "0h 0m";

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

export function calculateBreakDuration(
  breakStartWindow: string,
  breakEndWindow: string
): number {
  // Parse times
  const [startHour, startMinute] = breakStartWindow.split(":").map(Number);
  const [endHour, endMinute] = breakEndWindow.split(":").map(Number);

  // Calculate total minutes
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  // Calculate break duration in minutes
  let breakDuration = endTotalMinutes - startTotalMinutes;

  // Handle case where break end is on the next day
  if (breakDuration < 0) {
    breakDuration += 24 * 60; // Add a full day in minutes
  }

  return breakDuration;
}
