export type Habit = {
  id: string;
  name: string;
  days: Record<string, boolean>; // "2026-01-01": true/false
};

export type PlannerData = {
  month: number; // 0-11
  year: number;
  habits: Habit[];
};
