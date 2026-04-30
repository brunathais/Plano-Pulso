import type { Habit } from "../types/Planner";
import { getWeekIndex } from "../utils/date";
import HabitRow from "./HabitRow";

export default function HabitTable({
  habits,
  year,
  month,
  daysInMonth,
  onToggle,
}: {
  habits: Habit[];
  year: number;
  month: number;
  daysInMonth: number;
  onToggle: (habitId: string, date: string) => void;
}) {
  return (
    <div style={{ overflowX: "auto", border: "1px solid #2a2a2f", borderRadius: 12 }}>
      <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 900 }}>
        <thead>
          <tr>
            <th
              style={{
                position: "sticky",
                left: 0,
                background: "#0f0f12",
                padding: 12,
                textAlign: "left",
                minWidth: 220,
                borderBottom: "1px solid #2a2a2f",
              }}
            >
              Hábito
            </th>
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
              <th
                key={day}
                style={{
                  padding: 8,
                  fontSize: 12,
                  opacity: 0.8,
                  borderBottom: "1px solid #2a2a2f",
                }}
                title={`Semana ${getWeekIndex(day)}`}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {habits.map((habit) => (
            <HabitRow
              key={habit.id}
              habit={habit}
              year={year}
              month={month}
              daysInMonth={daysInMonth}
              onToggle={onToggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
