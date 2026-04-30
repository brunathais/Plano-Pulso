import HabitTable from "../components/HabitTable";
import MonthSelector from "../components/MonthSelector";
import { usePlanner } from "../hooks/usePlanner";
import { getDaysInMonth } from "../utils/date";


export default function PlannerPage() {
  const { data, toggleDay, setMonth, setData } = usePlanner();
  const daysInMonth = getDaysInMonth(data.year, data.month);

  function addHabit() {
    const name = prompt("Nome do hábito:");
    if (!name) return;

    setData((prev) => ({
      ...prev,
      habits: [...prev.habits, { id: crypto.randomUUID(), name, days: {} }],
    }));
  }

  return (
    <div>
      <MonthSelector month={data.month} year={data.year} onChange={setMonth} />

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <button
          onClick={addHabit}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #2a2a2f",
            cursor: "pointer",
          }}
        >
          + Adicionar hábito
        </button>

        <button
          onClick={() => localStorage.clear()}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #2a2a2f",
            cursor: "pointer",
            opacity: 0.8,
          }}
        >
          Limpar dados
        </button>
      </div>

      <HabitTable
        habits={data.habits}
        year={data.year}
        month={data.month}
        daysInMonth={daysInMonth}
        onToggle={toggleDay}
      />
    </div>
  );
}
