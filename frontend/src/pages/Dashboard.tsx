import { useState } from "react";
import PeriodCard from "./PeriodCard";
import DayDetails from "./DayDetails";

export type Period = "manha" | "tarde" | "noite";

export type DayPlan = {
  date: string;
  label: string;
  periods: Record<Period, string[]>;
};

export const weekMock: DayPlan[] = [
  {
    date: "2026-01-05",
    label: "Seg",
    periods: {
      manha: [
        "Inglês (20 min) - listening + vocabulário (antes do trabalho)",
        "Controle do celular: definir modo foco + limites do dia (5 min)",
      ],
      tarde: [
        "Trabalho (08-12 / 13-18)",
        "Micro hábito: beber água + alongar 5 min durante o expediente",
      ],
      noite: [
        "Pilates (18h-19h)",
        "Jantar + descanso",
        "QA (40 min) - testes funcionais + anotações",
      ],
    },
  },
  {
    date: "2026-01-06",
    label: "Ter",
    periods: {
      manha: [
        "Inglês (25 min) - speaking/shadowing",
        "Planejar 3 prioridades do dia (5 min)",
      ],
      tarde: [
        "Trabalho (08-12 / 13-18)",
        "Controle do celular: sem redes até 18h (modo foco)",
      ],
      noite: [
        "Curso de tecnologia (1h) - React/JS ou lógica",
        "Criatividade (15 min) - ideias de projeto ou diário",
        "Relaxar (sem celular 30 min antes de dormir)",
      ],
    },
  },
  {
    date: "2026-01-07",
    label: "Qua",
    periods: {
      manha: [
        "Exercício físico (20 min) - caminhada/treino leve em casa",
        "Inglês (15 min) - revisão rápida",
      ],
      tarde: [
        "Trabalho (08-12 / 13-18)",
        "Micro hábito: leitura curta sobre QA/tech (10 min no intervalo)",
      ],
      noite: [
        "QA (1h) - testes de API (Postman) ou testes exploratórios",
        "Comunicação: praticar inglês (10 min fala ou app)",
      ],
    },
  },
  {
    date: "2026-01-08",
    label: "Qui",
    periods: {
      manha: [
        "Inglês (20 min) - leitura + anotações",
        "Controle do celular: checklist rápido (5 min)",
      ],
      tarde: [
        "Trabalho (08-12 / 13-18)",
        "Organização mental: registrar tarefas e ideias (5 min)",
      ],
      noite: [
        "Desenvolver sistema básico (1h) - to-do list/planner simples",
        "Finanças (30 min) - renda fixa / organização financeira",
        "Hobby (20 min) - algo que você goste",
      ],
    },
  },
  {
    date: "2026-01-09",
    label: "Sex",
    periods: {
      manha: [
        "Inglês (20 min) - revisão semanal",
        "Exercício físico (15 min) - alongamento + core",
      ],
      tarde: ["Trabalho (08-12 / 13-17)", "Após trabalho: pausa e descanso"],
      noite: [
        "Criar cronograma da próxima semana (30 min)",
        "Pesquisar faculdade / cursos técnicos (30 min)",
        "Lazer (sem culpa)",
      ],
    },
  },
  {
    date: "2026-01-10",
    label: "Sáb",
    periods: {
      manha: [
        "Atividades domésticas (1h) - limpar + organizar",
        "Lista de compras (15 min) - itens básicos casa e pessoais",
      ],
      tarde: [
        "Projeto pessoal de tecnologia (1h30) - sistemas básicos",
        "QA (45 min) - automação inicial ou estudos",
      ],
      noite: ["Hobby / lazer", "Controle do celular: modo descanso"],
    },
  },
  {
    date: "2026-01-11",
    label: "Dom",
    periods: {
      manha: [
        "Planejamento semanal (45 min)",
        "Definir metas: tecnologia, QA, inglês, finanças",
      ],
      tarde: [
        "Finanças (45 min) - revisar gastos e objetivos",
        "Atividade fora de casa (caminhada, mercado, família)",
      ],
      noite: [
        "Criatividade (30 min) - ideia de projeto / leitura",
        "Relaxar e dormir cedo",
      ],
    },
  },
];

export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState<DayPlan>(weekMock[0]);

  return (
    <div style={{ display: "flex", gap: 20, padding: 20 }}>
      <div style={{ width: "65%" }}>
        <h2>semana</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
          {weekMock.map((day) => (
            <button key={day.date} onClick={() => setSelectedDay(day)} style={{
                padding: 10,
                borderRadius: 10,
                border: selectedDay.date === day.date ? "2px solid #000" : "1px solid #06750cff",
                background: selectedDay.date === day.date ? "#551313ff" : "#61aa3fff",
                cursor: "pointer",
              }}>
              <strong>{day.label}</strong>
              <div style={{ fontSize: 12, color: "#000000ff" }}>{day.date}</div>
            </button>
          ))}
        </div>

        <h3 style={{ marginTop: 30 }}>📌 resumo do dia ({selectedDay.label})</h3>

        <div>
          <PeriodCard title="🌅 manha" items={selectedDay.periods.manha} />
          <PeriodCard title="☀️ tarde" items={selectedDay.periods.manha} />
          <PeriodCard title="🌙 noite" items={selectedDay.periods.manha} />
        </div>
      </div>

      <div style={{ width: "35%", borderLeft: "1px solid #ddd", paddingLeft: 20 }}>
        <DayDetails day={selectedDay} />
      </div>
    </div>
  );
}
