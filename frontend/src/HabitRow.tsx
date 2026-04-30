import type { Habit } from "../types/Planner";
import { toISODate } from "../utils/date";
import ProgressBar from "./ProgressBar";

export default function HabitRow({
  habit,
  year,
  month,
  daysInMonth,
  onToggle,
}: {
  habit: Habit;
  year: number;
  month: number;
  daysInMonth: number;
  onToggle: (habitId: string, date: string) => void;
}) {
  const totalDone = Object.values(habit.days).filter(Boolean).length;
  const percent = (totalDone / daysInMonth) * 100;

  return (
    <tr>
      <td style={{ position: "sticky", left: 0, background: "#0f0f12", padding: 12, minWidth: 220 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <span>{habit.name}</span>
          <ProgressBar value={percent} />
        </div>
      </td>

      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
        const date = toISODate(year, month, day);
        const checked = !!habit.days[date];

        return (
          <td key={date} style={{ textAlign: "center" }}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(habit.id, date)}
            />
          </td>
        );
      })}
    </tr>
  );
}
