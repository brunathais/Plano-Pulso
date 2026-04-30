import { useEffect, useMemo, useState } from "react";
import { loadPlanner, savePlanner } from "../utils/storage";
import type { PlannerData } from "../types/Planner";

function getDefaultData(): PlannerData {
  const now = new Date();
  return {
    month: now.getMonth(),
    year: now.getFullYear(),
    habits: [
      { id: "1", name: "Encher litrinho de água", days: {} },
      { id: "2", name: "Verificar Emails", days: {} },
      { id: "3", name: "Podcasts", days: {} },
      { id: "4", name: "Músicas", days: {} },
      { id: "5", name: "Café com leite", days: {} },
      { id: "6", name: "Alinhar dia e compromissos", days: {} },
      { id: "7", name: "Olhar investimentos", days: {} },
      { id: "8", name: "Inglês", days: {} },
      { id: "9", name: "Exercícios", days: {} },
      { id: "10", name: "Leitura", days: {} },
      { id: "11", name: "Organizar casa", days: {} },
      { id: "12", name: "Massagem", days: {} },
      { id: "13", name: "Autocuidado", days: {} },
      { id: "14", name: "Estudar Universidade", days: {} },
       
    ],
  };
}

export function usePlanner() {
  const [data, setData] = useState<PlannerData>(() => loadPlanner() ?? getDefaultData());

  useEffect(() => {
    savePlanner(data);
  }, [data]);

  function toggleDay(habitId: string, date: string) {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.map((h) => {
        if (h.id !== habitId) return h;
        return {
          ...h,
          days: { ...h.days, [date]: !h.days[date] },
        };
      }),
    }));
  }

  function setMonth(year: number, month: number) {
    setData((prev) => ({
      ...prev,
      year,
      month,
    }));
  }

  const summary = useMemo(() => {
    const totalChecks = data.habits.reduce((acc, h) => acc + Object.values(h.days).filter(Boolean).length, 0);
    return { totalChecks };
  }, [data]);

  return { data, toggleDay, setMonth, summary, setData };
}
