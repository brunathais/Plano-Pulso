import type { PlannerData } from "../types/Planner";


const KEY = "habit-planner-data";

export function savePlanner(data: PlannerData) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function loadPlanner(): PlannerData | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
